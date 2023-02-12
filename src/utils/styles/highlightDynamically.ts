import { darken, getLuminance, lighten } from 'polished';

export const highlightDynamically = (
  theme: any,
  amount: number,
  threshold: number = 0.5,
): string => {
  const luminance = getLuminance(theme.background);
  const colorTransformFn = luminance >= threshold ? darken : lighten;

  return colorTransformFn(amount, theme.background);
};
