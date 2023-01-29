import styled from 'styled-components';

export const DragContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
`;

export const DesktopIconsContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  padding: 2rem;

  position: absolute;
  top: 0;
  left: 0;

  display: grid;
  gap: 1rem;
  grid-auto-columns: 5rem;
  grid-auto-rows: 7rem;
  grid-auto-flow: 'row';
`;
