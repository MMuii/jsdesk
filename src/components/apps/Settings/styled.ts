import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled, { css } from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(20rem, 1fr) 3fr;
  grid-template-rows: 100%;
  max-height: 100%;
  padding: 2rem;
  gap: 2rem;
`;

export const SettingsTabsWrapper = styled.div`
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }) => darken(0.03, theme.background)};
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.03)};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const SettingsTab = styled.div<{ $selected: boolean }>`
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  cursor: pointer;
  border-radius: 0.8rem;
  width: 100%;

  ${({ $selected }) =>
    $selected &&
    css`
      outline: none;
      background: ${({ theme }) => theme.foreground};
      color: ${({ theme }) => theme.background};

      > svg {
        color: ${({ theme }) => theme.background};
      }
    `}
`;

export const TabContentWrapper = styled(motion.div)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;

  > h2 {
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.foreground};
  opacity: 0.2;
  margin: 1rem 0;
`;
