import styled from 'styled-components';

export const ColorBlocksContainer = styled.div`
  display: flex;

  & > div:nth-child(2) {
    margin-left: 1.6rem;
  }
`;

export const ColorBlock = styled.div`
  width: 2rem;
  height: 1.4rem;
  margin-top: 0.2rem;
`;
