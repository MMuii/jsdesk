import { Binary } from 'interfaces/Binary';
import { noRerendered } from 'utils/hocs/noRerendered';
import { FileEntry, GridContainer } from './styled';
import { useFsSession } from 'utils/providers/FSSessionProvider';

interface Props {
  dirs: Array<[string, string]>;
  listMode: boolean;
}

const List = noRerendered(({ dirs, listMode }: Props) => {
  const directories = dirs
    .sort(([fileNameA], [fileNameB]) => fileNameA.localeCompare(fileNameB))
    .map(([fileName, fileType], idx) => (
      <FileEntry key={idx} $type={fileType}>
        {fileName}
      </FileEntry>
    ));

  return (
    <>
      {listMode && <div>total {dirs.length}</div>}
      <GridContainer $listMode={listMode}>{directories}</GridContainer>
    </>
  );
});

export const ls: Binary = ({ terminate, flags }) => {
  terminate();

  return () => {
    const { listFiles } = useFsSession();

    const files = listFiles();

    if (typeof files === 'string') {
      return <div>{files}</div>;
    }

    return (
      <List dirs={files.map(({ name, type }) => [name, type])} listMode={flags.l !== undefined} />
    );
  };
};
