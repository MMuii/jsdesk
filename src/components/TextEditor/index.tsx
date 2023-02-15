import { Path } from 'interfaces/fs';

interface Props {
  filePath: Path;
}

export const TextEditor = ({ filePath }: Props) => {
  return <div>Text editor at {filePath.join('/')}</div>;
};
