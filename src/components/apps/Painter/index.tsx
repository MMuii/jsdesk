import { useCallback, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { CanvasContainer, Container } from 'components/apps/Painter/styled';
import { Toolbox, Tools } from 'components/apps/Painter/Toolbox';
import { useNumberInputValue } from 'utils/hooks/useNumberInputValue';
import { useWindowPopup } from 'utils/providers/WindowPopupProvider';
import { useFileSystem } from 'utils/hooks/useFileSystem';
import { Path } from 'utils/hooks/useFileSystem/FileSystem';
import { PathPicker, PathPickerProps } from 'components/PathPicker';
import { ClearCanvasPopup } from './ClearCanvasPopup';
import { useWorkingFile } from 'utils/hooks/useWorkingFile';
import { Canvas } from './Canvas';
import { Navbar } from './Navbar';
import useUndo from 'use-undo';

interface Props {
  initialWorkingPath?: Path;
}

export interface LineProps {
  tool: Tools;
  brushSize: number;
  brushColor: string;
  points: number[];
}

export const Painter = ({ initialWorkingPath }: Props) => {
  const { workingFile, setWorkingFilePath } = useWorkingFile(initialWorkingPath);
  const [tool, setTool] = useState(Tools.pencil);
  const [brushColor, setBrushColor] = useState('#df4b26');
  const {
    value: brushSize,
    setValue: setBrushSize,
    inputProps: brushSizeInputProps,
  } = useNumberInputValue(5, { min: 1, max: 50 });
  const [lines, linesActions] = useUndo<LineProps[]>([]);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const { openPopup } = useWindowPopup();
  const { makeFileRelative, saveFile } = useFileSystem();
  const stageRef = useRef<Konva.Stage | null>(null);

  const filename = workingFile ? workingFile.name : 'New image.jpg';

  useEffect(() => {
    console.log('lines:', lines);
  }, [lines]);

  useEffect(() => {
    if (!workingFile) return;

    const img = new window.Image();
    img.src = workingFile.content;
    setLoadedImage(img);
  }, [workingFile]);

  const save = useCallback(() => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL();

    if (workingFile) {
      saveFile(workingFile.path, dataURL);
    }
  }, [saveFile, workingFile]);

  const saveAs = useCallback(() => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL();

    openPopup<PathPickerProps>({
      acceptCallback: (selectedPath: Path) => {
        makeFileRelative(selectedPath, 'jpg', true, dataURL, false);
        setWorkingFilePath(selectedPath);
      },
      fullWidth: true,
      ContentComponent: PathPicker,
      contentComponentProps: {
        initialFilename: filename,
        displayedFileTypes: ['dir', 'jpg'],
      },
    });
  }, [filename, makeFileRelative, openPopup, setWorkingFilePath]);

  const clearCanvas = useCallback(() => {
    openPopup({
      acceptCallback: () => linesActions.set([]),
      ContentComponent: ClearCanvasPopup,
    });
  }, [openPopup]);

  return (
    <Container>
      <Navbar
        filename={filename}
        clearCanvas={clearCanvas}
        save={save}
        saveAs={saveAs}
        isSaveDisabled={workingFile === null}
        linesActions={linesActions}
      />
      <CanvasContainer>
        <Toolbox
          selectedTool={tool}
          setSelectedTool={setTool}
          brushColor={brushColor}
          setBrushColor={setBrushColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          brushSizeInputProps={brushSizeInputProps}
        />
        <Canvas
          lines={lines.present}
          setLines={linesActions.set}
          brushColor={brushColor}
          brushSize={brushSize}
          tool={tool}
          stageRef={stageRef}
          loadedImage={loadedImage}
        />
      </CanvasContainer>
    </Container>
  );
};
