import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  margin: 3.6rem 0;
  grid-template-columns: min-content 1fr;
  grid-gap: 4.6rem;
`;

export const SystemInfoContainer = styled.div`
  color: ${({ theme }) => theme.brightCyan};

  & > div > span,
  & > div > a {
    color: ${({ theme }) => theme.foreground};
  }
`;

export const ColorBlocksContainer = styled.div`
  display: flex;
  margin-top: 1.6rem;

  & > div {
    width: 3rem;
    height: 2rem;

    ${({ theme }) => css`
      &:nth-child(1) {
        background: ${theme.brightBlack};
      }

      &:nth-child(2) {
        background: ${theme.brightBlue};
      }

      &:nth-child(3) {
        background: ${theme.brightRed};
      }

      &:nth-child(4) {
        background: ${theme.brightYellow};
      }

      &:nth-child(5) {
        background: ${theme.foreground};
      }

      &:nth-child(6) {
        background: ${theme.brightPurple};
      }

      &:nth-child(7) {
        background: ${theme.brightGreen};
      }

      &:nth-child(8) {
        background: ${theme.yellow};
      }
    `};
  }
`;
