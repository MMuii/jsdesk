import styled, { css } from 'styled-components';

export const Container = styled.div`
  white-space: nowrap;
  margin-right: 0.7rem;

  span {
    ${({ theme }) => css`
      &:nth-child(1) {
        color: ${theme.yellow};
      }

      &:nth-child(2) {
        color: ${theme.white};
      }

      &:nth-child(3) {
        color: ${theme.green};
      }

      &:nth-child(4) {
        color: ${theme.white};
      }
    `}
  }
`;
