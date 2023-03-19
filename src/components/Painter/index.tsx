import { useCallback, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Layer, Stage, Line, Rect, Image } from 'react-konva';
import { IoIosSave } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { KonvaPointerEvent } from 'konva/lib/PointerEvents';
import {
  CanvasContainer,
  CanvasWrapper,
  Container,
  Navbar,
  NavbarButtonsWrapper,
  SaveIconContainer,
} from './styled';
import { Toolbox, Tools } from './Toolbox';
import { useNumberInputValue } from 'utils/hooks/useNumberInputValue';
import { useWindowPopup } from 'utils/providers/WindowPopupProvider';
import { useFileSystem } from 'utils/hooks/useFileSystem';
import { Path } from 'utils/hooks/useFileSystem/FileSystem';
import { File } from 'utils/hooks/useFileSystem/File';

interface Props {
  workingFileRef?: File;
}

interface LineProps {
  tool: Tools;
  brushSize: number;
  brushColor: string;
  points: number[];
}

export const Painter = ({ workingFileRef }: Props) => {
  const [[width, height], setDimensions] = useState([600, 350]);
  const [tool, setTool] = useState(Tools.pencil);
  const [brushColor, setBrushColor] = useState('#df4b26');
  const {
    value: brushSize,
    setValue: setBrushSize,
    inputProps: brushSizeInputProps,
  } = useNumberInputValue(5, { min: 1, max: 50 });
  const [lines, setLines] = useState<LineProps[]>([]);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  const [showSavedIcon, setShowSavedIcon] = useState(false);
  const { openPopup } = useWindowPopup();
  const { makeFileRelative, saveFile } = useFileSystem();
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage | null>(null);

  useEffect(() => {
    if (!workingFileRef) return;

    const img = new window.Image();
    img.src = workingFileRef.content;
    setLoadedImage(img);
  }, []);

  const handleMouseDown = useCallback(
    (e: KonvaPointerEvent) => {
      isDrawing.current = true;
      // @ts-ignore
      const pos = e.target.getStage().getPointerPosition();
      // @ts-ignore
      setLines([...lines, { tool, brushSize, brushColor, points: [pos.x, pos.y] }]);
    },
    [brushColor, brushSize, lines, tool],
  );

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const handleMouseMove = (e: KonvaPointerEvent) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    const lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const saveImage = useCallback(() => {
    if (!stageRef.current) {
      return;
    }

    const dataURL = stageRef.current.toDataURL();
    console.log('dataURL', dataURL);

    if (workingFileRef) {
      saveFile(workingFileRef.path, dataURL);
    } else {
      // TODO - add path picker
      makeFileRelative('/image.jpg', 'jpg', true, dataURL);
    }
  }, [stageRef, makeFileRelative]);

  const clearCanvas = useCallback(() => {
    openPopup({
      title: 'Clear canvas',
      popupText: 'Are you sure to clear the canvas? All unsaved changes will be lost',
      acceptCallback: () => setLines([]),
    });
  }, [openPopup]);

  return (
    <Container>
      <Navbar>
        <div>{workingFileRef ? workingFileRef.name : 'New image'}</div>
        <NavbarButtonsWrapper>
          <FaTrashAlt onClick={clearCanvas} />
          <SaveIconContainer>
            <IoIosSave onClick={saveImage} />
            {showSavedIcon && <BsFillCheckCircleFill />}
          </SaveIconContainer>
        </NavbarButtonsWrapper>
      </Navbar>
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
        <CanvasWrapper id="canvas-wrapper">
          <Stage
            width={width}
            height={height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseup={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <Rect fill="#fff" width={width} height={height} />
            </Layer>

            <Layer>
              {loadedImage && <Image image={loadedImage} />}
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.brushColor}
                  strokeWidth={line.brushSize}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    line.tool === Tools.eraser ? 'destination-out' : 'source-over'
                  }
                />
              ))}
            </Layer>
          </Stage>
        </CanvasWrapper>
      </CanvasContainer>
    </Container>
  );
};
