import { darken, getLuminance, lighten } from 'polished';

export const highlightDynamically = (
  theme: any,
  amount: number,
  threshold: number = 0.5,
  themeProperty: string = 'background',
): string => {
  const luminance = getLuminance(theme[themeProperty]);
  const colorTransformFn = luminance >= threshold ? darken : lighten;

  return colorTransformFn(amount, theme[themeProperty]);
};
