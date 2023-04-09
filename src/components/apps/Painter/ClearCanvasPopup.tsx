import { ClearCanvasPopupContainer } from './styled';

interface Props {
  onAccept: () => void;
  onCancel: () => void;
}

export const ClearCanvasPopup = ({ onAccept, onCancel }: Props) => {
  return (
    <ClearCanvasPopupContainer>
      <h2>Clear canvas</h2>
      <p>Are you sure to clear the canvas? All unsaved changes will be lost</p>
      <div>
        <button onClick={onAccept}>Ok</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </ClearCanvasPopupContainer>
  );
};
