import { useCallback, useRef, useState } from 'react';
import Konva from 'konva';
import { Layer, Rect, Line, Stage, Image, Circle } from 'react-konva';
import { KonvaPointerEvent } from 'konva/lib/PointerEvents';
import { LineProps } from '.';
import { Tools } from './Toolbox';
import { CanvasWrapper } from './styled';
import { Actions } from 'use-undo';

interface Props {
  lines: LineProps[];
  setLines: Actions<LineProps[]>['set'];
  brushColor: string;
  brushSize: number;
  tool: Tools;
  stageRef: React.MutableRefObject<Konva.Stage | null>;
  loadedImage: HTMLImageElement | null;
}

const canvasWidth = 600;
const canvasHeight = 350;

export const Canvas = ({
  lines,
  setLines,
  brushColor,
  brushSize,
  tool,
  stageRef,
  loadedImage,
}: Props) => {
  const [[cursorX, cursorY], setCursorPosition] = useState([0, 0]);
  const isDrawing = useRef(false);

  const handleMouseDown = useCallback(
    (e: KonvaPointerEvent) => {
      isDrawing.current = true;
      // @ts-ignore
      const pos = e.target.getStage().getPointerPosition();
      // @ts-ignore
      setLines([...lines, { tool, brushSize, brushColor, points: [pos.x, pos.y] }], true);
    },
    [brushColor, brushSize, lines, setLines, tool],
  );

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: KonvaPointerEvent) => {
      if (!stageRef.current) return;
      const point = stageRef.current.getPointerPosition();
      if (!point) return;
      setCursorPosition([point.x, point.y]);
      if (!isDrawing.current) return;

      const stage = e.target.getStage();
      if (!stage) return;

      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat(), false);
    },
    [lines, setLines],
  );

  return (
    <CanvasWrapper id="canvas-wrapper">
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
        style={{ position: 'relative' }}
      >
        <Layer>
          <Rect fill="#fff" width={canvasWidth} height={canvasHeight} />
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

        <Layer>
          <Circle
            fill={tool === Tools.eraser ? '#000' : brushColor}
            radius={brushSize / 2}
            opacity={0.15}
            x={cursorX}
            y={cursorY}
          />
        </Layer>
      </Stage>
    </CanvasWrapper>
  );
};
