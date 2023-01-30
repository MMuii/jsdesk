import { AiOutlinePlus, AiOutlineMinus, AiOutlineDownload } from 'react-icons/ai';
import styled, { css } from 'styled-components';

export const DocContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
  place-items: center;
  overflow: scroll;
`;

export const PdfRendererControlPanel = styled.div<{ $width: number; $minWidth: number }>`
  width: 100%;
  min-width: ${({ $minWidth }) => `${$minWidth}px`};
  max-width: ${({ $width }) => `${$width}px`};
  margin: 0 auto;
  background: ${({ theme }) => theme.background};
  height: 4rem;
  padding: 1rem;
  position: sticky;
  z-index: 2;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DocName = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
`;

export const ControlsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 1rem;
  font-size: 1.4rem;
`;

export const ControlsSeparatorLine = styled.div`
  height: 1.4rem;
  width: 1px;
  background: ${({ theme }) => theme.foreground};
  opacity: 0.2;
  margin: 0rem 1rem;
`;

export const ScaleControlsWrapper = styled.div`
  display: flex;
  gap: 1rem;

  > svg {
    cursor: pointer;
  }
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
`;
