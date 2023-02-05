import { memo } from 'react';

export const noRerendered = <T,>(component: React.FC<T>) => {
  return memo(component, () => true);
};
