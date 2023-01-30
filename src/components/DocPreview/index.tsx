import { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import cv from 'assets/pdf/cv.pdf';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { PDFPageProxy } from 'react-pdf';
import {
  ControlsSeparatorLine,
  ControlsWrapper,
  DocContainer,
  DocName,
  MinusIcon,
  PdfRendererControlPanel,
  PlusIcon,
  ScaleControlsWrapper,
  DownloadIcon,
} from './styled';

interface Props {
  docName: string;
}

export const DocPreview = ({ docName }: Props) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [initialPageWidth, setInitialPageWidth] = useState<number>(-1);
  const [pageWidth, setPageWidth] = useState<number>(-1);
  const [scale, setScale] = useState<number>(1);

  const onDocumentLoadSuccess = async (pdfObject: PDFDocumentProxy) => {
    const page = await pdfObject.getPage(1);
    setNumPages(pdfObject.numPages);
    const width = page.view[2];
    setInitialPageWidth(width);
    setPageWidth(width);
  };

  const onRenderSuccess = async (pdfPageObject: PDFPageProxy) => {
    setPageWidth(pdfPageObject.width);
  };

  const scaleDown = () => {
    if (scale > 0.5) {
      setScale(prev => prev - 0.1);
    }
  };

  const scaleUp = () => {
    if (scale < 1.5) {
      setScale(prev => prev + 0.1);
    }
  };

  return (
    <div>
      <PdfRendererControlPanel $width={pageWidth} $minWidth={initialPageWidth}>
        <DocName>{docName}</DocName>
        <ControlsWrapper>
          <div>
            {pageNumber} / {numPages}
          </div>
          <ControlsSeparatorLine />
          <ScaleControlsWrapper>
            <MinusIcon onClick={scaleDown} $disabled={scale <= 0.501} />
            <div>{Math.round(scale * 100)}%</div>
            <PlusIcon onClick={scaleUp} $disabled={scale >= 1.501} />
          </ScaleControlsWrapper>
        </ControlsWrapper>
        <DownloadIcon onClick={() => alert('todo download')} />
      </PdfRendererControlPanel>
      <DocContainer>
        <Document file={cv} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={scale} onRenderSuccess={onRenderSuccess} />
        </Document>
      </DocContainer>
    </div>
  );
};
