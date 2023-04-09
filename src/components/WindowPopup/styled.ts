import { highlightDynamically } from 'utils/styles/highlightDynamically';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const DimLayer = styled(motion.div)`
  width: 100%;
  height: calc(100% - 3rem);
  margin-top: 3rem;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 999;
`;

export const PopupContainer = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  margin-top: 3rem;
  position: absolute;
  z-index: 1000;
  display: grid;
  place-items: center;
`;

export const Popup = styled(motion.div)<{ $fullWidth: boolean }>`
  min-width: 25rem;
  max-width: calc(100% - 12rem);
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: calc(100% - 12rem);
    `};

  overflow: hidden;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.1)};
  border-radius: 0.8rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
`;
