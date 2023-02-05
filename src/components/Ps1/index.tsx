import { noRerendered } from 'utils/hocs/noRerendered';
import { useFs } from 'utils/providers/FSProvider';
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
  const { location } = useFs();

  const currentDir = location[location.length - 1] === '/' ? '~' : location[location.length - 1];

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
  const { location } = useFs();
  const currentDir = location[location.length - 1] === '/' ? '~' : location[location.length - 1];

  return <Location currentDir={currentDir} />;
};
