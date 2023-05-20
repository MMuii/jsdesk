import styled from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const TreeRow = styled.div`
  cursor: pointer;

  > div:first-child {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    user-select: none;

    &:hover {
      color: ${({ theme }) => highlightDynamically(theme, 0.2, 0.5, 'foreground')};
      background: ${({ theme }) => highlightDynamically(theme, 0.02)};
    }
  }
`;

export const TreeRowInput = styled.input`
  background: ${({ theme }) => highlightDynamically(theme, 0.1, 0.5, 'foreground')};
  font-size: 1.2rem;
  padding: 0rem;
  margin: 0rem;
  max-width: 100%;
  border: none;
  font-family: 'Fira Code', monospace;
  border-radius: 0.4rem;

  &:focus {
    outline: none;
  }
`;
