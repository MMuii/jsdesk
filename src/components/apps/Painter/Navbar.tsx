import { Actions } from 'use-undo';
import { FaTrashAlt } from 'react-icons/fa';
import { MdSave, MdSaveAs } from 'react-icons/md';
import { GrUndo, GrRedo } from 'react-icons/gr';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { WindowNavbarContainer, NavbarButtonsSeparator } from 'components/styled/WindowNavbar';
import { IconButton } from 'components/IconButton';
import { HoverPopupPosition } from 'components/HoverPopup';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { NavbarButtonsWrapper } from './styled';
import { LineProps } from '.';
import { useState, useEffect } from 'react';

interface Props {
  filename: string;
  clearCanvas: () => void;
  save: () => void;
  saveAs: () => void;
  openFile: () => void;
  isSaveDisabled: boolean;
  linesActions: Actions<LineProps[]>;
}

const animateProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

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
    <WindowNavbarContainer>
      <LayoutGroup>
        <NavbarButtonsWrapper id="buttons-wrapper">
          <div style={{ marginRight: '0.5rem' }}>{filename}</div>
          <AnimatePresence mode="popLayout">
            {linesActions.canUndo && <motion.div {...animateProps}> - edited</motion.div>}
          </AnimatePresence>

          <NavbarButtonsSeparator layout />
          <IconButton
            icon={<AiOutlineFolderOpen />}
            onClick={openFile}
            hoverPopupContent="Open file"
            hoverPopupPosition={HoverPopupPosition.left}
          />
          <NavbarButtonsSeparator layout />
          <IconButton
            icon={<MdSave />}
            onClick={save}
            showChevronOnclickCallback
            disabled={isSaveDisabled}
            hoverPopupContent="Save"
          />
          <IconButton icon={<MdSaveAs />} onClick={saveAs} hoverPopupContent="Save as" />
          <NavbarButtonsSeparator layout />
          <IconButton
            icon={<GrUndo />}
            onClick={linesActions.undo}
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
      </LayoutGroup>
      <NavbarButtonsWrapper>
        <IconButton
          icon={<FaTrashAlt />}
          onClick={clearCanvas}
          hoverPopupContent="Clear canvas"
          hoverPopupPosition={HoverPopupPosition.right}
        />
      </NavbarButtonsWrapper>
    </WindowNavbarContainer>
  );
};
