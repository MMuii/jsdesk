import styled from 'styled-components';
import { darken } from 'polished';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const BottomBarContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr;

  border-top: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
  background: ${({ theme }) => darken(0.04, theme.background)};
  padding: 1rem;
`;

export const FilenameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Filename = styled.div`
  white-space: nowrap;
`;

export const FilenameInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.05)};
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.foreground};
  text-align: center;
  background: none;
  font-family: 'Fira Code', monospace;
  font-size: 1.2rem;
  text-align: left;
  padding-left: 0.6rem;

  &:focus {
    outline: none;
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => highlightDynamically(theme, 0.02)};
`;

export const PathContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PathWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  font-size: 1.2rem;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, min-content);

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.green};
  }

  > div {
    display: flex;
    cursor: pointer;
  }

  > div:nth-child(1),
  > div:nth-child(2),
  > div:nth-child(3) {
    display: flex;
    opacity: 0.5;
    cursor: default;
  }

  > div > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  > button {
    width: 8rem;
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
`;
