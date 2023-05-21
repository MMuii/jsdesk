import {
  IoDocumentText,
  IoImage,
  IoFolder,
  IoLogoJavascript,
  IoLogoCss3,
  IoLogoHtml5,
} from 'react-icons/io5';

export const getIconByFileType = (fileType: string): React.ReactElement => {
  switch (fileType) {
    case 'dir':
      return <IoFolder />;
    case 'txt':
      return <IoDocumentText />;
    case 'jpg':
    case 'png':
      return <IoImage />;
    case 'js':
      return <IoLogoJavascript />;
    case 'html':
      return <IoLogoHtml5 />;
    case 'css':
      return <IoLogoCss3 />;
    default:
      return <IoFolder />;
  }
};
