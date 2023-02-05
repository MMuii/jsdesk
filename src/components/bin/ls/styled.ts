import styled, { css } from 'styled-components';

export const GridContainer = styled.div<{ $listMode: boolean }>`
  width: 100%;

  ${({ $listMode }) =>
    !$listMode &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    `};
`;

export const FileEntry = styled.div<{ $type: string }>`
  color: ${({ $type, theme }) => ($type === 'dir' ? theme.green : theme.foreground)};
`;
