import styled from 'styled-components';

export const Indented = styled.div`
  margin-left: 2.6rem;
`;

export const Option = styled.div`
  & > span {
    font-style: italic;
    color: ${({ theme }) => theme.brightGreen};
  }
`;
