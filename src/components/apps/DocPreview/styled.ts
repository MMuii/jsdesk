import { iconButton } from 'utils/styles/iconButton';
import { darken } from 'polished';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDownload } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { highlightDynamically } from 'utils/styles/highlightDynamically';

export const DocContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
`;

export const PdfRendererControlPanel = styled.div<{ $width: number; $minWidth: number }>`
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
  background: ${({ theme }) => darken(0.04, theme.background)};
  border-bottom: 1px solid ${({ theme }) => highlightDynamically(theme, 0.2)};
  position: sticky;
  z-index: 2;
  top: 0;
  font-size: 1.6rem;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 15rem 1fr 15rem;
  place-items: center;

  svg {
    ${({ theme }) => iconButton(theme)}
  }
`;

export const DocName = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  justify-self: flex-start;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ControlsSeparatorLine = styled.div`
  height: 1.6rem;
  width: 1px;
  background: ${({ theme }) => theme.foreground};
  opacity: 0.2;
  margin: 0rem 1rem;
`;

export const ScaleControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  user-select: none;
`;

const iconCss = css<{ $disabled: boolean }>`
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};

  && {
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  }
`;

export const MinusIcon = styled(AiOutlineMinus)<{ $disabled: boolean }>`
  ${iconCss};
`;

export const PlusIcon = styled(AiOutlinePlus)<{ $disabled: boolean }>`
  ${iconCss};
`;

export const DownloadIcon = styled(AiOutlineDownload)`
  font-size: 2.2rem;
  cursor: pointer;
  justify-self: flex-end;
`;
