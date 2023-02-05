import { Binary } from 'interfaces/Binary';
import { noRerendered } from 'utils/hocs/noRerendered';
import { useFs } from 'utils/providers/FSProvider';

const Location = noRerendered(({ location }: { location: string[] }) => (
  <div>{location[0] + location.slice(1).join('/')}</div>
));

export const pwd: Binary = ({ terminate }) => {
  terminate();
  return () => {
    const { location } = useFs();
    return <Location location={location} />;
  };
};
