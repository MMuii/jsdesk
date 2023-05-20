import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';
import { HoverPopupPosition } from '.';

const getPosition = (position: HoverPopupPosition) => {
  switch (position) {
    case HoverPopupPosition.center:
      return css`
        left: 50%;
        transform: translate(-50%, 0.8rem);

        &::after {
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }
      `;
    case HoverPopupPosition.right:
      return css`
        right: 0;

        &::after {
          right: 0.8rem;
          transform: translateY(-50%) rotate(45deg);
        }
      `;
    case HoverPopupPosition.left:
      return css`
        left: 0;

        &::after {
          left: 0.8rem;
          transform: translateY(-50%) rotate(45deg);
        }
      `;
  }
};

export const PopupContainer = styled(motion.div)<{ $position: HoverPopupPosition }>`
  position: absolute;
  ${({ $position }) => getPosition($position)};
  top: 100%;

  background: red;
  font-size: 1.2rem;
  background: ${({ theme }) => highlightDynamically(theme, 0.1)};
  color: ${({ theme }) => theme.foreground};
  border-radius: 0.6rem;
  border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
  padding: 0.8rem;
  max-width: 15rem;
  z-index: 1000;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 0.8rem;
    height: 0.8rem;
    background: ${({ theme }) => highlightDynamically(theme, 0.1)};
    border-left: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
    border-top: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
    border-radius: 0.2rem;
  }
`;
