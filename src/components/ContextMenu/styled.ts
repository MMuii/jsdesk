import { darken, getLuminance, lighten } from 'polished';
import styled, { css } from 'styled-components';

export const ContextMenuContainer = styled.div<{ $x: number; $y: number; $isOpen: boolean }>`
  position: fixed;
  ${({ $x, $y }) => css`
    top: ${$y}px;
    left: ${$x}px;
  `};

  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  background: ${({ theme }) => theme.background};
  z-index: 10000;

  padding: 0.5rem;
  border-radius: 0.8rem;
  border: 1px solid
    ${({ theme }) => {
      const luminance = getLuminance(theme.background);
      const colorTransformFn = luminance >= 0.5 ? darken : lighten;

      return colorTransformFn(0.2, theme.background);
    }};

  min-width: 15rem;
  max-width: 25rem;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const ContextMenuOption = styled.div`
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;

  padding: 0.3rem 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 0.4rem;

  &:hover {
    outline: none;
    background: ${({ theme }) => theme.foreground};
    color: ${({ theme }) => theme.background};

    > svg {
      color: ${({ theme }) => theme.background};
    }
  }
`;
