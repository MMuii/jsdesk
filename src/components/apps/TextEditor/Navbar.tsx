import { FaFont } from 'react-icons/fa';
import { IconButton } from 'components/IconButton';
import { useNumberInputValue } from 'utils/hooks/useNumberInputValue';
import { WindowNavbarContainer, NavbarButtonsSeparator } from 'components/styled/WindowNavbar';
import { ButtonsWrapper } from './styled';
import { IoIosSave } from 'react-icons/io';

interface Props {
  fileName: string;
  isEdited: boolean;
  fontSize: number;
  decreaseFontSize: () => void;
  increaseFontSize: () => void;
  saveFileChanges: () => void;
  inputProps: ReturnType<typeof useNumberInputValue>['inputProps'];
}

export const Navbar = ({
  fileName,
  isEdited,
  fontSize,
  decreaseFontSize,
  increaseFontSize,
  saveFileChanges,
  inputProps,
}: Props) => {
  return (
    <WindowNavbarContainer>
      <div>
        {fileName}
        {isEdited && ' - edited'}
      </div>
      <ButtonsWrapper>
        <IconButton
          icon={<FaFont />}
          hoverPopupContent="Decrease font size"
          onClick={decreaseFontSize}
          disabled={fontSize <= 5}
          style={{ fontSize: '1.2rem' }}
        />
        <input {...inputProps} />
        <IconButton
          icon={<FaFont />}
          hoverPopupContent="Increase font size"
          onClick={increaseFontSize}
          disabled={fontSize >= 40}
        />
        <NavbarButtonsSeparator />
        <IconButton icon={<IoIosSave />} onClick={saveFileChanges} showChevronOnclickCallback />
      </ButtonsWrapper>
    </WindowNavbarContainer>
  );
};
