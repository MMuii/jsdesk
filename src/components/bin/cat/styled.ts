import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  outline: none;
  border: none;
  resize: none;
`;
