import { motion } from 'framer-motion';
import { darken, getLuminance, lighten, parseToHsl } from 'polished';
import styled, { css } from 'styled-components';

export const WindowContainer = styled(motion.div)<{ $isFocused: boolean; $zIndex: number }>`
  position: absolute;
  background: ${({ theme }) => theme.background};
  border: 1px solid
    ${({ theme }) => {
      const luminance = getLuminance(theme.background);
      const colorTransformFn = luminance >= 0.5 ? darken : lighten;

      return colorTransformFn(0.2, theme.background);
    }};

  border-radius: 7px;
  overflow: hidden;

  display: grid;
  grid-template-rows: min-content calc(100% - 3rem);
  grid-template-columns: 100%;

  z-index: ${({ $zIndex }) => $zIndex};
  transition: box-shadow 0.15s;
  max-height: 100vh;
  max-width: 100vw;

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
        rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
    `}
`;

export const WindowBar = styled.div<{ isDraggable: boolean }>`
  width: 100%;
  height: 3rem;
  background: ${({ theme }) => {
    const { lightness } = parseToHsl(theme.background);
    return darken(lightness / 8, theme.background);
  }};
  position: relative;

  ${({ isDraggable }) =>
    isDraggable &&
    css`
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    `}
`;

const windowButtonsStyleWhenFocused = css`
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
`;

const windowButtonsStyleNotFocused = css`
  &:nth-child(1) {
    margin-left: 1rem;
  }

  background: ${({ theme }) => lighten(0.05, theme.background)};
  opacity: 1;
`;

export const WindowBarButtonContainer = styled.div<{ $isFocused: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  > div {
    margin-right: 0.8rem;
    position: relative;

    ${({ $isFocused }) =>
      $isFocused ? windowButtonsStyleWhenFocused : windowButtonsStyleNotFocused};
  }
`;

export const WindowBarButton = styled.div<{ $isDisabled?: boolean }>`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      filter: grayscale(1);
      cursor: not-allowed !important;
    `};
`;

export const WindowName = styled.div`
  color: ${({ theme }) => theme.foreground};
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  font-weight: bold;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
`;

export const ResizeHandle = styled(motion.div)`
  width: 8px;
  height: 8px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: red;
  cursor: nwse-resize;
  opacity: 0;
`;
