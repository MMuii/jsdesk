import { BinProps, RenderableProps } from './BinProps';

export type Binary = (props: BinProps) => React.FC<RenderableProps> | null;
