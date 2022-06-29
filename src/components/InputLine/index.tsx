import React from 'react';
import { Ps1 } from 'components/Ps1';
import { Container, Input } from './styled';

interface Props {
  handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (input: string) => void;
  value: string;
}

export const InputLine = ({ handleSubmit, handleChange, value }: Props) => {
  return (
    <Container>
      <Ps1 />
      <Input
        type="text"
        onKeyDown={handleSubmit}
        onChange={e => handleChange(e.target.value)}
        value={value}
        autoFocus
      />
    </Container>
  );
};
