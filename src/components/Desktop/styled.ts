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
  grid-template-rows: repeat(auto-fill, 7rem);
  grid-template-columns: repeat(auto-fill, 7rem);
  gap: 10px;
  grid-auto-flow: column;
`;
