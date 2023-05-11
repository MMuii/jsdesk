import styled from 'styled-components';
import { motion } from 'framer-motion';
import { darken } from 'polished';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const WindowNavbarContainer = styled.div<{ $justify?: 'space-between' | 'flex-start' }>`
  width: 100%;
  font-size: 1.6rem;
  padding: 1rem;
  display: flex;
  justify-content: ${({ $justify }) => $justify};
  align-items: center;
  background: ${({ theme }) => darken(0.04, theme.background)};
  border-bottom: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
`;

WindowNavbarContainer.defaultProps = {
  $justify: 'space-between',
};

export const NavbarButtonsSeparator = styled(motion.div)`
  height: 1.6rem;
  width: 1px;
  background: ${({ theme }) => theme.foreground};
  opacity: 0.2;
  margin: 0rem 0.5rem;
`;
