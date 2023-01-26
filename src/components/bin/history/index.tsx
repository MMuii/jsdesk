import { Binary } from 'interfaces/Binary';

export const history: Binary = ({ terminate, history }) => {
  terminate();

  return () => (
    <div>
      {history.map(command => (
        <div key={command.time.getTime()}>{command.cmd}</div>
      ))}
    </div>
  );
};
