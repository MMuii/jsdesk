import { highlightDynamically } from 'utils/styles/highlightDynamically';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const IconContainer = styled(motion.div)<{ $disabled: boolean }>`
  position: relative;
  height: 2.6rem;
  width: 2.6rem;
  display: grid;
  place-items: center;

  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  svg {
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
    box-sizing: content-box;
    padding: 0.5rem;
    border-radius: 0.8rem;
    &:hover {
      background: ${({ theme }) => highlightDynamically(theme, 0.1)};
    }
  }

  svg:nth-child(2) {
    color: ${({ theme }) => theme.green};
    position: absolute;
    bottom: -0.3rem;
    right: -0.3rem;
    font-size: 1rem;
    pointer-events: none;
  }
`;
