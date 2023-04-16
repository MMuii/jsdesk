import { Actions } from 'use-undo';
import { FaTrashAlt } from 'react-icons/fa';
import { MdSave, MdSaveAs } from 'react-icons/md';
import { GrUndo, GrRedo } from 'react-icons/gr';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { NavbarButtonsWrapper, Navbar as NavbarContainer, NavbarButtonsSeparator } from './styled';
import { IconButton } from 'components/IconButton';
import { LineProps } from '.';
import { HoverPopup, HoverPopupPosition } from 'components/HoverPopup';

interface Props {
  filename: string;
  clearCanvas: () => void;
  save: () => void;
  saveAs: () => void;
  openFile: () => void;
  isSaveDisabled: boolean;
  linesActions: Actions<LineProps[]>;
}

export const Navbar = ({
  filename,
  clearCanvas,
  save,
  saveAs,
  openFile,
  isSaveDisabled,
  linesActions,
}: Props) => {
  return (
    <NavbarContainer>
      <NavbarButtonsWrapper>
        <div style={{ marginRight: '.5rem' }}>{filename}</div>
        <NavbarButtonsSeparator />
        <IconButton
          icon={<AiOutlineFolderOpen />}
          onClick={openFile}
          hoverPopupContent="Open file"
          hoverPopupPosition={HoverPopupPosition.left}
        />
        <NavbarButtonsSeparator />
        <IconButton
          icon={<MdSave />}
          onClick={save}
          showChevronOnclickCallback
          disabled={isSaveDisabled}
          hoverPopupContent="Save"
        />
        <IconButton icon={<MdSaveAs />} onClick={saveAs} hoverPopupContent="Save as" />
        <NavbarButtonsSeparator />
        <IconButton
          icon={<GrUndo />}
          onClick={() => {
            console.log('undo!');
            linesActions.undo();
          }}
          disabled={!linesActions.canUndo}
          hoverPopupContent="Undo"
        />
        <IconButton
          icon={<GrRedo />}
          onClick={linesActions.redo}
          disabled={!linesActions.canRedo}
          hoverPopupContent="Redo"
        />
      </NavbarButtonsWrapper>
      <NavbarButtonsWrapper>
        <IconButton
          icon={<FaTrashAlt />}
          onClick={clearCanvas}
          hoverPopupContent="Clear canvas"
          hoverPopupPosition={HoverPopupPosition.right}
        />
      </NavbarButtonsWrapper>
    </NavbarContainer>
  );
};
