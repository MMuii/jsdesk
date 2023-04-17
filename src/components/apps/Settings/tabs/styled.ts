import styled from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const SettingsRow = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
  width: 100%;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-radius: 0.4rem;

  &:hover {
    background: ${({ theme }) => highlightDynamically(theme, 0.02)};
  }
`;
