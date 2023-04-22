import { highlightDynamically } from 'utils/styles/highlightDynamically';
import { ThemePreviewContainer } from './styled';

interface Props {
  theme: any;
  onClick: () => void;
}

export const ThemePreview = ({ theme, onClick }: Props) => {
  return (
    <ThemePreviewContainer
      whileHover={{ y: -5, borderColor: highlightDynamically(theme, 0.5) }}
      onClick={onClick}
    >
      <div style={{ background: highlightDynamically(theme, 0.1) }}>
        <div />
        <div />
        <div />
      </div>
      <div style={{ color: theme.foreground, background: theme.background }}>
        Lorem ipsum dolor sit amet
      </div>
    </ThemePreviewContainer>
  );
};
