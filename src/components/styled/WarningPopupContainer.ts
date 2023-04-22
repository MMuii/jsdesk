import styled from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const WarningPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;

  > h2 {
    font-size: 1.8rem;
  }

  > p {
    font-size: 1.2rem;
    font-weight: 400;
  }

  > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 2rem;

    > button {
      width: 100%;
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
  }
`;
