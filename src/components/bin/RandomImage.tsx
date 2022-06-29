import React from 'react';
import { BinProps } from 'interfaces/BinProps';

export const RandomImage: React.FC<BinProps> = ({ args }) => {
  const [imageTopic, width = 200, height = 200] = args;

  return (
    <img
      src={`https://api.lorem.space/image/${imageTopic}?w=${width}&h=${height}`}
      alt="Some random thing"
    />
  );
};
