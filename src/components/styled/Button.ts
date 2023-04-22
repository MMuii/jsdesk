import styled from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const Button = styled.div<{ $variant: 'proceed' | 'cancel' }>`
  height: 2.4rem;
  border-radius: 0.6rem;
  border: 1px solid ${({ theme }) => highlightDynamically(theme, 0.1)};
  color: ${({ theme }) => theme.foreground};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
  cursor: pointer;
  background: ${({ $variant, theme }) =>
    $variant === 'proceed' ? highlightDynamically(theme, 0.05) : 'transparent'};
  width: min-content;
  white-space: nowrap;
  display: grid;
  padding: 0 1rem;
  place-items: center;

  &:hover {
    background: ${({ theme }) => highlightDynamically(theme, 0.1)};
  }

  &:focus {
    outline: none;
  }
`;
