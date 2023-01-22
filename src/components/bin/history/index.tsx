import { Binary } from "utils/providers/ShellProvider";

export const history: Binary = ({ terminate, history }) => {
  terminate();

  return () => (
    <div>{history.map(command => (<div>{command.cmd}</div>))}</div>
  )
}