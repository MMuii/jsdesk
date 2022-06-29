import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
`;

export const Input = styled.input`
  border: none;
  background: transparent;
  font-family: 'Fira Code', monospace;
  color: ${({ theme }) => theme.foreground};
  font-size: 1.4rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`;
