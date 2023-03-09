import { css } from 'styled-components';
import { highlightDynamically } from './highlightDynamically';

export const iconButton = (theme: any) => css`
  box-sizing: content-box;
  padding: 0.5rem;
  border-radius: 0.8rem;
  cursor: pointer;

  &:hover {
    background: ${highlightDynamically(theme, 0.1)};
  }
`;
