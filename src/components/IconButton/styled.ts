import { motion } from 'framer-motion';
import styled from 'styled-components';

export const IconContainer = styled(motion.div)<{ $disabled: boolean }>`
  position: relative;
  height: 2.6rem;

  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  svg {
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
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
