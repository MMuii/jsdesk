import { useEffect, useState } from 'react';
import { Path } from 'interfaces/fs';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { useNumberInputValue } from 'utils/hooks/useNumberInputValue';
import { Navbar } from './Navbar';
import { Container, Textarea } from './styled';

interface Props {
  filePath: Path;
  fileName: string;
}

export const TextEditor = ({ filePath, fileName }: Props) => {
  const { getFileRef, saveFile } = useFsSession();
  const [fileRef, setFileRef] = useState(getFileRef(filePath));
  const [value, setValue] = useState(getFileRef(filePath).content);
  const {
    value: fontSize,
    setValue: setFontSize,
    inputProps,
  } = useNumberInputValue(12, { min: 5, max: 40 });
  const [showSavedIcon, setShowSavedIcon] = useState(false);

  useEffect(() => {
    if (showSavedIcon) {
      setFileRef(getFileRef(filePath));
    }
  }, [showSavedIcon]);

  const increaseFontSize = () => {
    if (fontSize < 40) {
      const newSize = fontSize + 1;
      setFontSize(newSize);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 5) {
      const newSize = fontSize - 1;
      setFontSize(newSize);
    }
  };

  const saveFileChanges = () => {
    saveFile(filePath, value);
    setShowSavedIcon(true);
    setTimeout(() => {
      setShowSavedIcon(false);
    }, 1500);
  };

  const isEdited = fileRef.content !== value;

  return (
    <Container>
      <Navbar
        fileName={fileName}
        isEdited={isEdited}
        fontSize={fontSize}
        decreaseFontSize={decreaseFontSize}
        increaseFontSize={increaseFontSize}
        saveFileChanges={saveFileChanges}
        inputProps={inputProps}
      />
      <Textarea $fontSize={fontSize} value={value} onChange={e => setValue(e.target.value)} />
    </Container>
  );
};
