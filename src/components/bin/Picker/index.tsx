import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { BinProps, RenderableProps } from 'interfaces/BinProps';
import { pickerMachine } from './machine';

export const Picker: React.FC<RenderableProps> = ({ isFocused, terminate }) => {
  const [state, send] = useMachine(pickerMachine);

  useEffect(() => {
    console.log('Poszedl use effect');

    if (isFocused) {
      const handler = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
            if (state.matches('picking')) {
              send({ type: 'USER_PICK' });
              console.log('Switching state');
            } else {
              console.log('state sie nie zgadza:', state.value);
            }
            break;
          case 'Enter':
            if (state.matches('picking')) {
              send({ type: 'END_WORKING' });
              terminate();
              console.log('Ending working');
            } else if (state.matches('initial')) {
              send({ type: 'START_WORKING' });
              console.log('Starting working');
            }
            break;
          default:
            break;
        }
      };

      document.addEventListener('keydown', handler);

      return () => document.removeEventListener('keydown', handler);
    } else {
      console.log('not focused :(');
    }
  }, [send, state, isFocused]);

  const renderResult = () => {
    return <div style={{ color: 'red' }}>You've picked option {state.context.userInput}</div>;
  };

  return (
    <>
      <div>Pick an option by hitting enter key</div>
      <div>{state.context.userInput === 0 && <span>{'>'}</span>} Option 1</div>
      <div>{state.context.userInput === 1 && <span>{'>'}</span>}Option 2</div>
      {state.matches('finished') && renderResult()}
    </>
  );
};
