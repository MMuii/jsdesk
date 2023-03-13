import { Binary } from 'interfaces/Binary';
import { noRerendered } from 'utils/hocs/noRerendered';
import { useFsSession } from 'utils/providers/FSSessionProvider';

const Location = noRerendered(({ location }: { location: string[] }) => (
  <div>
    /users/guest/desktop{location.length > 1 ? '/' : ''}
    {location.slice(1).join('/')}
  </div>
));

export const pwd: Binary = ({ terminate }) => {
  terminate();
  return () => {
    const { location } = useFsSession();
    return <Location location={location} />;
  };
};
