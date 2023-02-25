import { noRerendered } from 'utils/hocs/noRerendered';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { Container } from './styled';

const Location = noRerendered(({ currentDir }: { currentDir: string }) => (
  <Container>
    <span>guest</span>
    <span>@</span>
    <span>{window.location.hostname}</span>
    <span>:</span>
    <span>&nbsp;{currentDir}</span>
    <span>&nbsp;$</span>
  </Container>
));

export const Ps1 = () => {
  const { location } = useFsSession();

  const currentDir =
    location[location.length - 1] === '/' ? 'desktop' : location[location.length - 1];

  return (
    <Container>
      <span>guest</span>
      <span>@</span>
      <span>{window.location.hostname}</span>
      <span>:</span>
      <span>&nbsp;{currentDir}</span>
      <span>&nbsp;$</span>
    </Container>
  );
};

export const NoRerenderedPs1 = () => {
  const { location } = useFsSession();
  const currentDir =
    location[location.length - 1] === '/' ? 'desktop' : location[location.length - 1];

  return <Location currentDir={currentDir} />;
};
