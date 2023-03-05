import { useEffect } from 'react';
import { Path } from 'interfaces/fs';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { IoFolder } from 'react-icons/io5';
import { FiHardDrive } from 'react-icons/fi';
import { Chevron, Container, PathContainer, UnchangeablePathWrapper } from './styled';
import { FilesTable } from './FilesTable';

interface Props {
  initialPath?: Path;
}

export const FileExplorer = ({ initialPath = ['/'] }: Props) => {
  const {
    location,
    getCurrentDirRef,
    changeDirectory,
    makeFileRelative,
    moveFileAbsolute,
    removeDirectory,
  } = useFsSession();

  useEffect(() => {
    changeDirectory(initialPath);
  }, []);

  const renderBottomNavigation = () => {
    const directories = location.map((dir, idx) => (
      <div key={`${dir}${idx}`} onClick={() => changeDirectory(location.slice(0, idx + 1))}>
        <IoFolder />
        <div>{dir === '/' ? 'desktop' : dir}</div>
      </div>
    ));

    // @ts-ignore
    const result = directories.flatMap((dir, idx) => [dir, <Chevron key={idx} />]);
    result.pop();
    return result;
  };

  const currentDirFiles = getCurrentDirRef().files;

  return (
    <Container>
      <FilesTable
        directories={currentDirFiles}
        changeDirectory={changeDirectory}
        moveFile={moveFileAbsolute}
        removeFile={removeDirectory}
        location={location}
        makeFile={makeFileRelative}
      />
      <PathContainer>
        <UnchangeablePathWrapper>
          <FiHardDrive />
          <div>LocalStorage HD</div>
          <Chevron />
          <IoFolder />
          <div>users</div>
          <Chevron />
          <IoFolder />
          <div>guest</div>
          <Chevron />
        </UnchangeablePathWrapper>
        {renderBottomNavigation()}
      </PathContainer>
    </Container>
  );
};
