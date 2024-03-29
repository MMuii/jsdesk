import styled from 'styled-components';
import { FaFont } from 'react-icons/fa';
import { highlightDynamically } from 'utils/styles/highlightDynamically';
import { styledScrollbar } from 'utils/styles/styledScrollbar';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const FontIcon = styled(FaFont)<{ $disabled: boolean }>`
  box-sizing: content-box;
  padding: 0.5rem;
  border-radius: 0.8rem;
  cursor: pointer;

  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};

  && {
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  }

  &:hover {
    background: ${({ theme }) => highlightDynamically(theme, 0.1)};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: 100%;

  input {
    background: ${({ theme }) => theme.background};
    border: none;
    color: ${({ theme }) => theme.foreground};
    width: 4rem;
    text-align: center;
    border-radius: 0.8rem;
    padding: 0.4rem 0;
    margin: 0;
    font-size: 1.4rem;

    &:focus {
      outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const Textarea = styled.textarea<{ $fontSize: number }>`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  font-size: ${({ $fontSize }) => $fontSize}px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  outline: none;
  border: none;
  resize: none;

  ${({ theme }) => styledScrollbar(theme)};

  &:focus {
    outline: none;
  }
`;
