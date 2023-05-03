import json5 from 'json5';
import { REPLScope, ScopeMutation } from './types';

export const getScopeInjectionScript = (scope: REPLScope): string => {
  return Object.values(scope).reduce((script, assignments) => {
    const assignmentWithTrailingSemicolons = assignments
      .map(assignment => (assignment.endsWith(';') ? assignment : `${assignment};`))
      .join(' ');

    return (script += assignmentWithTrailingSemicolons);
  }, '');
};

export const evalScript = (script: string): string => {
  let result = eval(script);
  console.info('RESULT:', result);

  if (typeof result === 'undefined') {
    result = 'undefined';
  }

  if (typeof result === 'object') {
    const stringified = json5.stringify(
      result,
      (_, value) => {
        if (typeof value === 'function') {
          return value.toString();
        }

        return value;
      },
      4,
    );
    result = stringified;
  }

  return result.toString();
};

export const updateScope = (
  scopeRef: React.MutableRefObject<REPLScope>,
  scopeMutations: ScopeMutation[],
) => {
  if (!scopeRef.current) return;

  scopeMutations.forEach(({ name, mutation }) => {
    if (!(name in scopeRef.current)) {
      scopeRef.current[name] = [mutation];
    } else {
      scopeRef.current[name].push(mutation);
    }
  });

  console.info('scope after:', scopeRef.current);
};
