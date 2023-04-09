import { highlightDynamically } from 'utils/styles/highlightDynamically';
import styled, { css } from 'styled-components';
import { BsChevronLeft } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa';
import { darken, lighten } from 'polished';
import { iconButton } from 'utils/styles/iconButton';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 1fr min-content;
`;

export const PathContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
  background: ${({ theme }) => darken(0.04, theme.background)};

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.green};
  }

  div:nth-child(1),
  div:nth-child(2),
  div:nth-child(3) {
    display: flex;
    opacity: 0.5;
    cursor: default;
  }

  > div:not(:first-child) {
    display: flex;
    cursor: pointer;
  }
`;

export const UnchangeablePathWrapper = styled.div`
  display: flex;
  opacity: 0.5;
  cursor: default;

  > div {
    display: flex;
  }

  > div > div {
    /* max-width: 4rem; */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const Chevron = styled(FaChevronRight)`
  margin: 0 0.5rem;

  && {
    color: ${({ theme }) => theme.foreground};
  }
`;

export const CurrentDirHeaderContainer = styled.div`
  width: 100%;
  font-size: 1.6rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  background: ${({ theme }) => darken(0.04, theme.background)};
  border-bottom: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
`;

export const CurrentDirHeaderButtonsWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  box-sizing: content-box;

  svg {
    ${({ theme }) => iconButton(theme)};
  }

  > span {
    padding-top: 0.5rem;
  }
`;

export const NavArrow = styled(BsChevronLeft)<{ $enabled: boolean }>`
  ${({ $enabled }) =>
    !$enabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
`;

export const TableWrapper = styled.div`
  overflow: auto; /* Clips any scrollbars that appear */
  position: relative;
  min-height: 15rem;

  ${({ theme }) => {
    const slightlyLightened = lighten(0.08, theme.background);
    const lightened = lighten(0.25, theme.background);
    const darkened = darken(0.05, lightened);

    return css`
      &::-webkit-scrollbar {
        background-color: ${slightlyLightened};
        width: 16px;
      }

      /* background of the scrollbar except button or resizer */
      &::-webkit-scrollbar-track {
        background-color: ${slightlyLightened};
      }

      /* scrollbar itself */
      &::-webkit-scrollbar-thumb {
        background-color: ${lightened};
        border-radius: 16px;
        border: 4px solid ${slightlyLightened};

        &:hover {
          background-color: ${darkened};
        }
      }

      /* set button(top and bottom of the scrollbar) */
      &::-webkit-scrollbar-button {
        display: none;
      }
    `;
  }}
`;

export const ResizableTable = styled.table`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr);
  grid-template-rows: min-content;
  grid-auto-flow: row;

  &::after {
    content: '';
    position: absolute;
    top: 3.2rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => highlightDynamically(theme, 0.2)};
    border-radius: 0px;
  }

  thead,
  tbody,
  tr {
    display: contents;
  }

  tbody tr:first-child td {
    position: relative;
    margin-top: 0.5rem;

    &::before {
      content: '';
      position: absolute;
      top: -0.5rem;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${({ theme }) => highlightDynamically(theme, 0.2)};
    }

    &:first-child::before {
      left: -1rem;
      width: calc(1rem + 100%);
    }

    &:last-child::before {
      right: 1rem;
      width: calc(1rem + 100%);
    }
  }

  th {
    position: relative;
    font-size: 1.2rem;
    padding: 1rem;
    cursor: pointer;

    svg {
      font-size: 1.4rem;
      line-height: 0;
      margin: -0.2rem 0;
    }
  }

  th,
  td {
    text-align: left;
    height: min-content;

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  tr > th:last-child div {
    margin-right: 1rem;
  }
`;

export const ResizeHandle = styled.div`
  display: block;
  position: absolute;
  cursor: col-resize;
  height: 50% !important;
  width: 1px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  border-right: 2px solid transparent;
  background: ${({ theme }) => highlightDynamically(theme, 0.2)};
`;

export const FileTableRow = styled.tr<{ $type: string; $isRenaming: boolean }>`
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;

  > td {
    padding: 0.4rem 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:first-child {
      padding: ${({ $isRenaming }) => ($isRenaming ? '0.2rem' : '0.4rem')} 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: 1rem;
      border-radius: 0.6rem 0 0 0.6rem;
    }

    &:nth-child(3) {
      text-align: right;
    }

    &:last-child {
      border-radius: 0 0.6rem 0.6rem 0;
      margin-right: 1rem;
    }
  }

  &:nth-child(even) > td {
    background: ${({ theme }) => darken(0.025, theme.background)};
  }

  &:focus-within > td {
    outline: none;
    background: ${({ theme }) => theme.foreground};
    color: ${({ theme }) => theme.background};

    > svg {
      color: ${({ theme }) => theme.background};
    }
  }

  svg {
    color: ${({ theme, $type }) => ($type === 'dir' ? theme.green : theme.foreground)};
    min-width: 1.2rem;
  }
`;

export const FileTableRowInput = styled.input`
  background: ${({ theme }) => highlightDynamically(theme, 0.1, 0.5, 'foreground')};
  font-size: 1.2rem;
  padding: 0rem;
  margin: 0rem;
  max-width: 100%;
  border: none;
  font-family: 'Fira Code', monospace;
  border-radius: 0.4rem;

  &:focus {
    outline: none;
  }
`;
