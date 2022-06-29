import styled, { css } from 'styled-components';
import { darken, lighten, parseToHsl, hsl } from 'polished';

export const TerminalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 140rem;
  width: 80%;
  max-height: 75rem;
  height: 70%;
  background: ${({ theme }) => theme.background};
  border-radius: 7px;
  overflow: hidden;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr;
`;

export const WindowBar = styled.div`
  width: 100%;
  height: 3rem;
  background: ${({ theme }) => {
    const { lightness } = parseToHsl(theme.background);
    return darken(lightness / 8, theme.background);
  }};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  place-items: center;
`;

export const WindowBarButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  > div {
    margin-right: 0.8rem;

    &:hover {
      cursor: pointer;
    }

    &:nth-child(1) {
      margin-left: 1rem;
      background: #ff605c;

      &:hover {
        background: ${darken(0.04, '#ff605c')};
      }
    }

    &:nth-child(2) {
      background: #ffbd44;

      &:hover {
        background: ${darken(0.08, '#ffbd44')};
      }
    }

    &:nth-child(3) {
      background: #00ca4e;

      &:hover {
        background: ${darken(0.04, '#00ca4e')};
      }
    }
  }
`;

export const WindowBarButton = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
`;

export const WindowName = styled.div`
  color: ${({ theme }) => theme.foreground};
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  font-weight: bold;
`;

export const HistoryContainer = styled.div`
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
  line-height: 1.35;
  font-size: 1.4rem;
  padding: 0.8rem 1rem;

  ${({ theme }) => {
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
  }}
`;

export const HistoryEntry = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
`;
