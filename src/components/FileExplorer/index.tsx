import { Path } from 'interfaces/fs';
import { FSSessionProvider } from 'utils/providers/FSSessionProvider';
import { Explorer } from './Explorer';

interface Props {
  initialPath?: Path;
}

export const FileExplorer = ({ initialPath = ['desktop'] }: Props) => {
  return (
    <FSSessionProvider>
      <Explorer initialPath={initialPath} />
    </FSSessionProvider>
  );
};
