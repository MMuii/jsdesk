export interface BinProps {
  programName: string;
  args: string[];
  terminate: () => void;
  clearHistory: () => void;
  setTheme: (theme: string) => boolean;
}

export interface RenderableProps extends BinProps {
  isFocused: boolean;
}
