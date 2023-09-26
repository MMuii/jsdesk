import { createRef, useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { Textarea } from './styled';
import { FileSystemError } from 'utils/hooks/useFileSystem/FileSystemError';

export const cat: Binary = ({ terminate, args }) => {
  terminate();

  return () => {
    const { getFileRef } = useFsSession();
    const [result, setResult] = useState<string>();
    const textareaRef = createRef<HTMLTextAreaElement>();

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [textareaRef]);

    // TODO - this needs refactor badly
    useEffect(() => {
      try {
        const path = args?.join(' ')?.replace('\\ ', ' ');
        const file = getFileRef(path);
        setResult(file.content);
      } catch (err) {
        if (err instanceof FileSystemError) {
          setResult(err.message);
        }
      }
    }, []);

    return <Textarea value={result} readOnly ref={textareaRef} />;
  };
};
