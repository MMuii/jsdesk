import { darken, lighten } from 'polished';
import { css } from 'styled-components';

export const styledScrollbar = (theme: any) => {
  const slightlyLightened = lighten(0.08, theme.background);
  const lightened = lighten(0.25, theme.background);
  const darkened = darken(0.05, lightened);

  return css`
    &::-webkit-scrollbar {
      background-color: ${slightlyLightened};
      width: 16px;
    }

    /* background of the scrollbar except button or resizer */
    &::-webkit-scrollbar-track {
      background-color: ${slightlyLightened};
    }

    /* scrollbar itself */
    &::-webkit-scrollbar-thumb {
      background-color: ${lightened};
      border-radius: 16px;
      border: 4px solid ${slightlyLightened};

      &:hover {
        background-color: ${darkened};
      }
    }

    /* set button(top and bottom of the scrollbar) */
    &::-webkit-scrollbar-button {
      display: none;
    }
  `;
};
