import React from 'react';
import { Container } from './styled';

export const Ps1 = () => {
  return (
    <Container>
      <span>guest</span>
      <span>@</span>
      <span>{window.location.hostname}</span>
      <span>:$ ~</span>
    </Container>
  );
};
