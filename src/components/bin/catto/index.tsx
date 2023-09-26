import { Flags } from 'interfaces/BinProps';
import { Binary } from 'interfaces/Binary';

const getCatImageUrl = (flags: Flags, timestamp: number): string => {
  let url = 'https://cataas.com/cat';

  const say = flags['say'];
  if (say !== undefined) {
    url += `/says/${say}`;
  }

  url += `?timestamp=${timestamp}`;

  const height = flags['h'] ?? flags['height'];
  if (height !== undefined) {
    url += `&height=${height}`;
  }

  return url;
};

export const catto: Binary = ({ terminate, flags }) => {
  terminate();

  const timestamp = new Date().getTime();
  const imageSrc = getCatImageUrl(flags, timestamp);

  return () => {
    return <img src={imageSrc} alt="Some nice cat" />;
  };
};
