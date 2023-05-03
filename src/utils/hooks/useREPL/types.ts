export interface Output {
  text: string;
  type: 'output' | 'input' | 'error' | 'log';
}

export interface ScopeMutation {
  name: string;
  mutation: string;
}

export interface REPLScope {
  [key: string]: string[];
}
