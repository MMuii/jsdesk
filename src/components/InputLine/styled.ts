import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
`;

export const Input = styled.input<{ $isValid: boolean }>`
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  font-family: 'Fira Code', monospace;
  color: ${({ theme, $isValid }) => ($isValid ? theme.foreground : theme.brightRed)};
  caret-color: ${({ theme }) => theme.foreground};
  font-size: 1.4rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const HintContainer = styled.div`
  &::after {
    position: absolute;
    left: 0;
    top: 0;
    content: attr(data-hint);
    width: 100%;
    height: 100%;
    pointer-events: none;
    color: ${({ theme }) => theme.foreground};
    opacity: 0.4;
    font-size: 1.4rem;
  }
`;
