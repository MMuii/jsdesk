import { BiPencil } from 'react-icons/bi';
import { RxEraser } from 'react-icons/rx';
import { HiOutlinePaintBrush } from 'react-icons/hi2';
import { useNumberInputValue } from 'utils/hooks/useNumberInputValue';
import {
  BrushSizeButton,
  BrushSizeInput,
  BrushSizeInputContainer,
  BrushSizeSlider,
  ColorPickerInput,
  ToolboxContainer,
  ToolIconWrapper,
} from 'components/apps/Painter/styled';

interface Props {
  selectedTool: Tools;
  setSelectedTool: (tool: Tools) => void;
  brushColor: string;
  setBrushColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (brushSize: number) => void;
  brushSizeInputProps: ReturnType<typeof useNumberInputValue>['inputProps'];
}

export enum Tools {
  brush = 'brush',
  eraser = 'eraser',
  pencil = 'pencil',
}

const tools = [
  {
    type: Tools.brush,
    icon: <HiOutlinePaintBrush />,
  },
  {
    type: Tools.pencil,
    icon: <BiPencil />,
  },
  {
    type: Tools.eraser,
    icon: <RxEraser />,
  },
];

const mapRange = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
): number => {
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  const output = toLow + percentage * (toHigh - toLow);

  return output;
};

export const Toolbox = ({
  selectedTool,
  setSelectedTool,
  brushColor,
  setBrushColor,
  brushSize,
  setBrushSize,
  brushSizeInputProps,
}: Props) => {
  const renderTools = () =>
    tools.map(tool => (
      <ToolIconWrapper
        key={tool.type}
        $isSelected={selectedTool === tool.type}
        onClick={() => setSelectedTool(tool.type)}
      >
        {tool.icon}
      </ToolIconWrapper>
    ));

  return (
    <ToolboxContainer>
      <div>
        <BrushSizeButton $size={mapRange(brushSize, 1, 50, 1, 36)} />
        <BrushSizeSlider
          type="range"
          min={1}
          max={50}
          value={brushSize}
          onChange={e => setBrushSize(parseInt(e.target.value))}
        />
        <BrushSizeInputContainer>
          <BrushSizeInput {...brushSizeInputProps} />
          <div>px</div>
        </BrushSizeInputContainer>
      </div>
      <div>{renderTools()}</div>
      <div>
        <ColorPickerInput
          type="color"
          value={brushColor}
          onChange={e => setBrushColor(e.target.value)}
        />
      </div>
    </ToolboxContainer>
  );
};
