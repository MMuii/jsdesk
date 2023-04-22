import { WarningPopupContainer } from 'components/styled/WarningPopupContainer';

interface Props {
  onAccept: () => void;
  onCancel: () => void;
}

export const DeleteAllDataPopup = ({ onAccept, onCancel }: Props) => {
  return (
    <WarningPopupContainer>
      <h2>Delete all data</h2>
      <p>Are you sure to delete all data? All files will be lost</p>
      <div>
        <button onClick={onAccept}>Ok</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </WarningPopupContainer>
  );
};
