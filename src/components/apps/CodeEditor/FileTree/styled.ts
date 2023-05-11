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
