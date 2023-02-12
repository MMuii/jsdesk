import { IoFolder } from 'react-icons/io5';
import { IoDocumentText } from 'react-icons/io5';

export const getIconByFileType = (fileType: string): React.ReactElement => {
  switch (fileType) {
    case 'dir':
      return <IoFolder />;
    case 'txt':
      return <IoDocumentText />;
    default:
      return <IoFolder />;
  }
};
