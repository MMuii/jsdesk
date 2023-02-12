import { useFsSession } from 'utils/providers/FSSessionProvider';
import { FiHardDrive } from 'react-icons/fi';
import { IoFolder } from 'react-icons/io5';
import { Chevron, Container, PathContainer, UnchangeablePathWrapper } from './styled';
import { FilesTable } from './FilesTable';
import { HeaderNavigation } from './HeaderNavigation';
import { useEffect } from 'react';
import { Path } from 'interfaces/fs';

interface Props {
  initialPath: Path;
}

export const Explorer = ({ initialPath }: Props) => {
  const { location, getCurrentDirRef, changeDirectory, changeDirectoryAbsolute } = useFsSession();

  useEffect(() => {
    changeDirectoryAbsolute(initialPath);
  }, []);

  const renderBottomNavigation = () => {
    const directories = location.map((dir, idx) => (
      <div key={`${dir}${idx}`} onClick={() => changeDirectoryAbsolute(location.slice(0, idx + 1))}>
        <IoFolder />
        <div>{dir}</div>
      </div>
    ));

    // @ts-ignore
    // const result = directories.reduce((r, a) => r.concat(a, <Chevron />), directories);
    const result = directories.flatMap(dir => [dir, <Chevron />]);
    result.pop();
    return result;
  };

  return (
    <Container>
      <HeaderNavigation location={location} changeDirectoryAbsolute={changeDirectoryAbsolute} />
      <FilesTable directories={getCurrentDirRef().files} changeDirectory={changeDirectory} />
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
