import styled from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const CodeEditorAppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const EditorContainer = styled.div`
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  place-items: center;
`;

export const NoFilesOpenedContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 1.6rem;
  text-align: center;

  > div {
    display: grid;
    place-items: center;
    row-gap: 2rem;
  }
`;

export const TerminalContainer = styled.div`
  width: 100%;
  height: 30rem;
  min-height: 30rem;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => highlightDynamically(theme, 0.1)};
`;

export const FileTreeContainer = styled.div`
  width: 30rem;
  font-size: 1.4rem;
  border-right: 1px solid ${({ theme }) => highlightDynamically(theme, 0.1)};
  white-space: nowrap;
  text-overflow: ellipsis;

  > div:nth-child(2) {
    padding: 1rem;
    max-width: 100%;
  }
`;
