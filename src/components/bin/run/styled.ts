import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 2rem;

  > div {
    display: flex;
    margin-left: -2rem;
    gap: 0.8rem;
    font-size: 1.4rem;
    line-height: 1.9rem;

    > svg {
      margin-top: 0.1rem;
      font-size: 1.6rem;
    }

    &.error {
      code,
      span,
      svg {
        color: ${({ theme }) => theme.red} !important;
      }
    }

    &.input {
      > svg {
        opacity: 0.4;
      }
    }
  }
`;
