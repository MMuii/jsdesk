import styled from 'styled-components';
import { Reorder } from 'framer-motion';
import { highlightDynamically } from 'utils/styles/highlightDynamically';
import { iconButton } from 'utils/styles/iconButton';

export const OpenedFilesPanelContainer = styled(Reorder.Group)`
  width: 100%;
  min-height: 3rem;
  height: 3rem;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => highlightDynamically(theme, 0.1)};
  overflow: auto;
`;

export const OpenedFileContainer = styled(Reorder.Item)<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: min-content;
  height: 100%;
  padding: 0 0.5rem 0 1rem;
  background: ${({ theme, $selected }) =>
    $selected ? highlightDynamically(theme, 0.05) : theme.background};
  border-right: 1px solid ${({ theme }) => highlightDynamically(theme, 0.05)};
  transition: background 0.1s;
  font-size: 1.3rem;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? highlightDynamically(theme, 0.05) : highlightDynamically(theme, 0.03)};
  }

  > svg {
    ${({ theme }) => iconButton(theme)}
  }
`;
