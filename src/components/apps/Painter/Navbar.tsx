import { Actions } from 'use-undo';
import { FaTrashAlt } from 'react-icons/fa';
import { MdSave, MdSaveAs } from 'react-icons/md';
import { GrUndo, GrRedo } from 'react-icons/gr';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { NavbarButtonsWrapper, Navbar as NavbarContainer, NavbarButtonsSeparator } from './styled';
import { IconButton } from 'components/IconButton';
import { LineProps } from '.';

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
        <IconButton icon={<AiOutlineFolderOpen />} onClick={openFile} />
        <NavbarButtonsSeparator />
        <IconButton
          icon={<MdSave />}
          onClick={save}
          showChevronOnclickCallback
          disabled={isSaveDisabled}
        />
        <IconButton icon={<MdSaveAs />} onClick={saveAs} />
        <NavbarButtonsSeparator />
        <IconButton
          icon={<GrUndo />}
          onClick={() => {
            console.log('undo!');
            linesActions.undo();
          }}
          disabled={!linesActions.canUndo}
        />
        <IconButton
          icon={<GrRedo />}
          onClick={linesActions.redo}
          disabled={!linesActions.canRedo}
        />
      </NavbarButtonsWrapper>
      <NavbarButtonsWrapper>
        <FaTrashAlt onClick={clearCanvas} />
      </NavbarButtonsWrapper>
    </NavbarContainer>
  );
};
