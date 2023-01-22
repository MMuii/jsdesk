import React from 'react';
import { Ps1 } from 'components/Ps1';
import { Container, Input, HintContainer, InputContainer } from './styled';

interface Props {
  handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (input: string) => void;
  value: string;
  hint: string;
  isValid: boolean;
  inputRef: React.Ref<HTMLInputElement>;
}

export const InputLine = ({
  handleSubmit,
  handleChange,
  value,
  hint,
  isValid,
  inputRef,
}: Props) => {
  return (
    <Container>
      <Ps1 />
      <InputContainer>
        <HintContainer data-hint={hint}>
          <Input
            type="text"
            onKeyDown={handleSubmit}
            onChange={e => handleChange(e.target.value)}
            value={value}
            autoFocus
            $isValid={isValid}
            ref={inputRef}
          />
        </HintContainer>
      </InputContainer>
    </Container>
  );
};
