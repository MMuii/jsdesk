import React, { useEffect, useState } from 'react';
import { BinProps } from 'interfaces/BinProps';
import { useTheme } from 'utils/ThemeProvider';

export const Theme: React.FC<BinProps> = ({ args, terminate }) => {
  const { setTheme } = useTheme();
  const [theme] = useState<boolean>(() => setTheme(args[0]));

  useEffect(() => {
    terminate();
  }, []);

  if (theme) {
    return <div>Theme set to {args[0]}</div>;
  }

  return <div>Theme {args[0]} not found</div>;
};
