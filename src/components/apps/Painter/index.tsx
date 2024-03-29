import { useCallback, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import useUndo from 'use-undo';
import { CanvasContainer, Container } from 'components/apps/Painter/styled';
import { Toolbox, Tools } from 'components/apps/Painter/Toolbox';
import { useNumberInputValue } from 'utils/hooks/useNumberInputValue';
import { useWindowPopup } from 'utils/providers/WindowPopupProvider';
import { Path } from 'utils/hooks/useFileSystem/FileSystem';
import { SaveAsPopup, PathPickerProps } from 'components/popups/SaveAsPopup';
import { useWorkingFile } from 'utils/hooks/useWorkingFile';
import { OpenFilePopup } from 'components/popups/OpenFilePopup';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { ClearCanvasPopup } from './ClearCanvasPopup';
import { Canvas } from './Canvas';
import { Navbar } from './Navbar';
interface Props {
  initialPath?: Path;
}

export interface LineProps {
  tool: Tools;
  brushSize: number;
  brushColor: string;
  points: number[];
}

export const Painter = ({ initialPath }: Props) => {
  const { makeFileRelative, saveFile, getFileRef } = useFsSession();
  const { workingFile, setWorkingFile } = useWorkingFile(
    initialPath ? getFileRef(initialPath) : undefined,
  );
  const [tool, setTool] = useState(Tools.brush);
  const [brushColor, setBrushColor] = useState('#df4b26');
  const {
    value: brushSize,
    setValue: setBrushSize,
    inputProps: brushSizeInputProps,
  } = useNumberInputValue(5, { min: 1, max: 50 });
  const [lines, linesActions] = useUndo<LineProps[]>([], { useCheckpoints: true });
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const { openPopup } = useWindowPopup();
  const stageRef = useRef<Konva.Stage | null>(null);

  const filename = workingFile ? workingFile.name : 'New image.jpg';

  useEffect(() => {
    if (!workingFile) return;

    const img = new window.Image();
    img.src = workingFile.content;
    setLoadedImage(img);
    linesActions.reset([]);
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
        setWorkingFile(selectedPath);
      },
      fullWidth: true,
      ContentComponent: SaveAsPopup,
      contentComponentProps: {
        initialFilename: filename,
        displayedFileTypes: ['dir', 'jpg'],
      },
    });
  }, [filename, makeFileRelative, openPopup, setWorkingFile]);

  const clearCanvas = useCallback(() => {
    openPopup({
      acceptCallback: () => linesActions.set([]),
      ContentComponent: ClearCanvasPopup,
    });
  }, [openPopup]);

  const openFile = useCallback(() => {
    openPopup<PathPickerProps>({
      acceptCallback: (selectedPath: Path) => {
        setWorkingFile(selectedPath);
      },
      fullWidth: true,
      ContentComponent: OpenFilePopup,
      contentComponentProps: {
        initialFilename: filename,
        displayedFileTypes: ['dir', 'jpg'],
      },
    });
  }, [filename, openPopup, setWorkingFile]);

  return (
    <Container>
      <Navbar
        filename={filename}
        clearCanvas={clearCanvas}
        save={save}
        saveAs={saveAs}
        openFile={openFile}
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
