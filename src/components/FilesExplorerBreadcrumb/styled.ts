import { FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const PathContainer = styled.div`
  width: 100%;
  max-width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};

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

export const Chevron = styled(FaChevronRight)`
  margin: 0 0.5rem;

  && {
    color: ${({ theme }) => theme.foreground};
  }
`;
