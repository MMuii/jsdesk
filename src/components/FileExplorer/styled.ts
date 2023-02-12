import { highlightDynamically } from 'utils/styles/highlightDynamically';
import styled, { css } from 'styled-components';
import { BsChevronLeft } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa';
import { darken } from 'polished';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
`;

export const PathContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
  background: ${({ theme }) => darken(0.025, theme.background)};

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.green};
  }

  > div:not(:first-child) {
    display: flex;
    cursor: pointer;
  }
`;

export const UnchangeablePathWrapper = styled.div`
  display: flex;
  opacity: 0.5;
  cursor: default;
`;

export const Chevron = styled(FaChevronRight)`
  margin: 0 0.5rem;

  && {
    color: ${({ theme }) => theme.foreground};
  }
`;

export const CurrentDirHeaderContainer = styled.div`
  width: 100%;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
  background: ${({ theme }) => darken(0.025, theme.background)};
  border-bottom: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};

  > div {
    display: flex;
    gap: 0.6rem;
    box-sizing: content-box;

    svg {
      box-sizing: content-box;
      padding: 0.5rem;
      border-radius: 0.8rem;

      &:hover {
        background: ${({ theme }) => highlightDynamically(theme, 0.1)};
      }
    }
  }

  > span {
    padding-top: 0.5rem;
  }
`;

export const NavArrow = styled(BsChevronLeft)<{ $enabled: boolean }>`
  ${({ $enabled }) =>
    !$enabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
`;

export const FileEntry = styled.div<{ $type: string }>`
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;
  padding: 0.4rem 1rem;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:nth-child(even) {
    background: ${({ theme }) => darken(0.025, theme.background)};
  }

  &:focus {
    outline: none;
    background: ${({ theme }) => theme.foreground};
    color: ${({ theme }) => theme.background};

    > svg {
      color: ${({ theme }) => theme.background};
    }
  }

  > svg {
    color: ${({ theme, $type }) => ($type === 'dir' ? theme.green : theme.foreground)};
  }
`;
