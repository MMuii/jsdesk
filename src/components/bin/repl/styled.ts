import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 2rem;

  > div:not(:last-child) {
    display: flex;
    margin-left: -2rem;
    gap: 0.8rem;
    /* align-items: center; */
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

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -2rem;
  gap: 0.8rem;
  width: 100%;
  font-size: 1.4rem;

  > svg {
    color: ${({ theme }) => theme.brightBlue};
    font-size: 1.6rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  background: none;
  border: none;
  font-family: 'Fira Code', monospace;
  font-size: 1.4rem;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.foreground};

  &:focus {
    outline: none;
  }
`;
