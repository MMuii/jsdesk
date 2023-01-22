import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { darken, getLuminance, lighten, parseToHsl } from 'polished';

export const DragContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: grid;
  place-items: center;
`;

export const TerminalContainer = styled(motion.div)`
  margin: auto;
  background: ${({ theme }) => theme.background};
  border: 1px solid
    ${({ theme }) => {
      const luminance = getLuminance(theme.background);
      const colorTransformFn = luminance >= 0.5 ? darken : lighten;

      return colorTransformFn(0.2, theme.background);
    }};

  border-radius: 7px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
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
    position: relative;

    &:hover {
      cursor: pointer;
    }

    &:nth-child(1) {
      margin-left: 1rem;
      background: #ff605c;

      &:hover {
        background: ${darken(0.04, '#ff605c')};

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0.7rem;
          height: 0.7rem;
          background: black;
          opacity: 0.6;
        }

        &::after {
          clip-path: polygon(
            20% 0%,
            0% 20%,
            30% 50%,
            0% 80%,
            20% 100%,
            50% 70%,
            80% 100%,
            100% 80%,
            70% 50%,
            100% 20%,
            80% 0%,
            50% 30%
          );
        }
      }
    }

    &:nth-child(2) {
      background: #ffbd44;

      &:hover {
        background: ${darken(0.08, '#ffbd44')};

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0.8rem;
          height: 0.1rem;
          background: black;
          opacity: 0.6;
        }
      }
    }

    &:nth-child(3) {
      background: #00ca4e;

      &:hover {
        background: ${darken(0.04, '#00ca4e')};

        &::after,
        &::before {
          content: '';
          position: absolute;
          width: 0.45rem;
          height: 0.45rem;
          background: black;
          opacity: 0.6;
        }

        &::after {
          top: 0.3rem;
          left: 0.3rem;
          clip-path: polygon(100% 0, 0 0, 0 100%);
        }

        &::before {
          bottom: 0.3rem;
          right: 0.3rem;
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
        }
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
