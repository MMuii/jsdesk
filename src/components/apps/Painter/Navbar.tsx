import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { MdSave, MdSaveAs } from 'react-icons/md';
import { NavbarButtonsWrapper, SaveIconContainer, Navbar as NavbarContainer } from './styled';

interface Props {
  filename: string;
  clearCanvas: () => void;
  saveImage: () => void;
  showSavedIcon: boolean;
}

export const Navbar = ({ filename, clearCanvas, saveImage, showSavedIcon }: Props) => {
  return (
    <NavbarContainer>
      <div>{filename}</div>
      <NavbarButtonsWrapper>
        <FaTrashAlt onClick={clearCanvas} />
        <SaveIconContainer>
          <MdSave onClick={saveImage} />
          {showSavedIcon && <BsFillCheckCircleFill />}
        </SaveIconContainer>
        <SaveIconContainer>
          <MdSaveAs onClick={saveImage} />
          {showSavedIcon && <BsFillCheckCircleFill />}
        </SaveIconContainer>
      </NavbarButtonsWrapper>
    </NavbarContainer>
  );
};
