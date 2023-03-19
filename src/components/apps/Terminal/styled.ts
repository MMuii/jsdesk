import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { darken, getLuminance, lighten } from 'polished';

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
