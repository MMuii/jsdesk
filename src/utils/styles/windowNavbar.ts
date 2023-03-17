import { darken } from 'polished';
import { css } from 'styled-components';
import { highlightDynamically } from './highlightDynamically';
import { iconButton } from './iconButton';

export const windowNavbar = (theme: any) => {
  return css`
    width: 100%;
    font-size: 1.6rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => darken(0.04, theme.background)};
    border-bottom: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};

    svg {
      ${({ theme }) => iconButton(theme)};
    }
  `;
};
