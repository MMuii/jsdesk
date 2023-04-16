import styled from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 1fr min-content;
`;

export const PathContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem 0.3rem 0;
  border-top: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};

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
