import { IoDocumentText, IoImage, IoFolder } from 'react-icons/io5';

export const getIconByFileType = (fileType: string): React.ReactElement => {
  switch (fileType) {
    case 'dir':
      return <IoFolder />;
    case 'txt':
      return <IoDocumentText />;
    case 'jpg':
    case 'png':
      return <IoImage />;
    default:
      return <IoFolder />;
  }
};
