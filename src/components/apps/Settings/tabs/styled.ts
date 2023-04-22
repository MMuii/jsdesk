import { motion } from 'framer-motion';
import styled from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';
import { styledScrollbar } from 'utils/styles/styledScrollbar';

export const SettingsRow = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
  width: 100%;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-radius: 0.4rem;

  &:hover {
    background: ${({ theme }) => highlightDynamically(theme, 0.02)};
  }
`;

export const ThemesPreviewsContainer = styled.div`
  width: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 2rem;
  overflow: auto;
  margin-top: 2rem;
  padding-top: 0.6rem;
  padding-right: 2rem;

  ${({ theme }) => styledScrollbar(theme)};
`;

export const ThemePreviewContainer = styled(motion.div)`
  position: relative;
  width: 15rem;
  height: 10rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 0.8rem;
  border: solid 1px ${({ theme }) => highlightDynamically(theme, 0.03)};
  overflow: hidden;
  cursor: pointer;

  > div {
    // navbar
    &:nth-child(1) {
      width: 100%;
      height: 2rem;
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      gap: 0.5rem;

      > div {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        opacity: 0.2;
        background: black;
      }
    }

    &:nth-child(2) {
      padding: 1rem;
      width: 100%;
      height: 100%;
    }
  }
`;

export const StorageBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  border-radius: 0.6rem;
  border: solid 1px ${({ theme }) => highlightDynamically(theme, 0.3)};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  overflow: hidden;

  > div:nth-child(2) {
    z-index: 1;
  }
`;

export const StorageBarUsed = styled.div<{ $percentageUsed: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $percentageUsed }) => $percentageUsed}%;
  border-radius: 0.6rem 0 0 0.6rem;
  background: ${({ theme }) => highlightDynamically(theme, 0.08)};
`;
