import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { iconButton } from 'utils/styles/iconButton';
import { highlightDynamically } from 'utils/styles/highlightDynamically';
import { styledScrollbar } from 'utils/styles/styledScrollbar';
import { motion } from 'framer-motion';

export const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const NavbarButtonsWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const NavbarButtonsSeparator = styled(motion.div)`
  height: 1.6rem;
  width: 1px;
  background: ${({ theme }) => theme.foreground};
  opacity: 0.2;
  margin: 0rem 0.5rem;
`;

export const ToolboxContainer = styled.div`
  height: calc(100% - 4rem);
  width: 7rem;
  min-width: 7rem;
  max-width: 100%;
  padding: 2rem 0;
  margin: 2rem;
  background: ${({ theme }) => darken(0.03, theme.background)};
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.05)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  > div:first-child {
    gap: 0.5rem;
  }

  svg {
    ${({ theme }) => iconButton(theme)};
  }
`;

export const ToolIconWrapper = styled.span<{ $isSelected: boolean }>`
  svg {
    font-size: 2.2rem;

    ${({ theme, $isSelected }) =>
      $isSelected &&
      css`
        background: ${highlightDynamically(theme, 0.1)};
      `}
  }
`;

export const BrushSizeButton = styled.div<{ $size: number }>`
  position: relative;
  background: none;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.05)};
  width: 3.6rem;
  height: 3.6rem;

  &::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 50%;
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    background: ${({ theme }) => highlightDynamically(theme, 0.15)};
  }
`;

export const BrushSizeSlider = styled.input`
  width: 5rem;
  -webkit-appearance: none;
  background: transparent;
  margin-top: 0.4rem;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: ${({ theme }) => theme.foreground};
    border-radius: 50%;
    height: 1.2rem;
    width: 1.2rem;
    margin-top: -0.4rem;
  }

  &::-moz-range-thumb {
    background: ${({ theme }) => theme.foreground};
    border-radius: 50%;
    height: 1.2rem;
    width: 1.2rem;
    margin-top: -0.4rem;
  }

  &::-webkit-slider-runnable-track {
    height: 0.5rem;
    width: 5rem;
    background: ${({ theme }) => highlightDynamically(theme, 0.05)};
  }

  &::-ms-track {
    width: 5rem;
    cursor: pointer;

    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &:focus {
    outline: none;
  }
`;

export const BrushSizeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  > div,
  > input {
    font-size: 1.3rem;
  }
`;

export const BrushSizeInput = styled.input`
  width: 2.5rem;
  background: none;
  border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.05)};
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.foreground};
  text-align: center;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ColorPickerInput = styled.input`
  width: 3rem;
  height: 3rem;

  border: none;
  box-shadow: none;
  padding: 0;
  background: none;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 0.8rem;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 0.8rem;
  }
`;

export const CanvasContainer = styled.div`
  width: 100%;
  height: calc(100% - 4.7rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CanvasWrapper = styled.div`
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  box-shadow: none;

  display: grid;
  place-items: center;

  > div {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 2rem 2rem 2rem 0;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
  }

  ${({ theme }) => styledScrollbar(theme)};
`;

export const ClearCanvasPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;

  > h2 {
    font-size: 1.8rem;
  }

  > p {
    font-size: 1.2rem;
    font-weight: 400;
  }

  > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 2rem;

    > button {
      width: 100%;
      height: 2.4rem;
      border-radius: 0.6rem;
      border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.1)};
      color: ${({ theme }) => theme.foreground};
      box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
      cursor: pointer;

      &:nth-child(1) {
        background: ${({ theme }) => highlightDynamically(theme, 0.05)};
      }

      &:nth-child(2) {
        background: transparent;
      }

      &:hover {
        background: ${({ theme }) => highlightDynamically(theme, 0.1)};
      }

      &:focus {
        outline: none;
      }
    }
  }
`;
