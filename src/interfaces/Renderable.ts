import { BinProps, RenderableProps } from './BinProps';

export interface Renderable {
  cmd: string | null;
  pid: number;
  time: Date;
  component: React.FC<RenderableProps>;
  args: BinProps;
}
