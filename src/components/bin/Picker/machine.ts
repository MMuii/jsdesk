import { assign, createMachine } from 'xstate';

interface MachineContext {
  userInput: number;
}

type MachineEvents =
  | { type: 'START_WORKING' }
  | { type: 'USER_PICK' }
  | { type: 'INCREMENT' }
  | { type: 'END_WORKING' };

export const pickerMachine = createMachine<MachineContext, MachineEvents>({
  id: 'pickerMachine',
  initial: 'initial',
  context: {
    userInput: 0,
  },
  states: {
    initial: {
      on: {
        START_WORKING: {
          target: 'picking',
        },
      },
    },
    picking: {
      on: {
        END_WORKING: {
          target: 'finished',
        },
        USER_PICK: {
          actions: assign({
            userInput: ({ userInput }, _) => (userInput === 0 ? 1 : 0),
          }),
        },
        INCREMENT: {
          actions: assign({
            userInput: ({ userInput }, _) => userInput + 1,
          }),
        },
      },
    },
    finished: {},
  },
});
