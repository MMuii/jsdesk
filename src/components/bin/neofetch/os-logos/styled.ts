import styled from 'styled-components';

export const LogoContainer = styled.div`
  & > div,
  & > div > span {
    white-space: pre;

    &.c0 {
      color: ${({ theme }) => theme.brightGreen};
    }

    &.c1 {
      color: ${({ theme }) => theme.brightYellow};
    }

    &.c2 {
      color: ${({ theme }) => theme.brightRed};
    }

    &.c3 {
      color: ${({ theme }) => theme.brightPurple};
    }

    &.c4 {
      color: ${({ theme }) => theme.brightBlue};
    }

    &.c5 {
      color: ${({ theme }) => theme.brightBlack};
    }

    &.c6 {
      color: ${({ theme }) => theme.brightRed};
    }
  }
`;
