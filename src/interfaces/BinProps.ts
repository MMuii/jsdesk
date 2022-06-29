export interface BinProps {
  args: string[];
  terminate: () => void;
  clearHistory: () => void;
  isFocused: boolean;
}
