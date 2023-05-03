import { parse } from 'acorn';
import { ScopeMutation } from './types';

export const getScopeMutations = (script: string): ScopeMutation[] => {
  const ast = parse(script, { ecmaVersion: 'latest' });
  const variableDeclarations: ScopeMutation[] = [];

  console.info('ast:', ast);

  const traverse = (node: any) => {
    if (node.type === 'VariableDeclaration') {
      node.declarations.forEach((declaration: any) => {
        variableDeclarations.push({
          name: declaration.id.name,
          mutation: script.substring(node.start, node.end),
        });
      });
    }
    if (node.type === 'FunctionDeclaration') {
      variableDeclarations.push({
        name: node.id.name,
        mutation: script.substring(node.start, node.end),
      });

      // do not iterate over function body
      delete node.body;
    }
    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      if (node.id) {
        variableDeclarations.push({
          name: node.id.name,
          mutation: script.substring(node.start, node.end),
        });
      }
    }
    if (node.type === 'ExpressionStatement') {
      if (node.expression.type === 'AssignmentExpression') {
        let name: string;
        if (node.expression.left.type === 'MemberExpression') {
          name = node.expression.left.object.name;
        } else {
          name = node.expression.left.name;
        }

        variableDeclarations.push({
          name,
          mutation: script.substring(node.start, node.end),
        });
      }

      if (node.expression.type === 'UnaryExpression') {
        variableDeclarations.push({
          name: node.expression.argument.object.name,
          mutation: script.substring(node.start, node.end),
        });
      }
    }

    node.body?.forEach(traverse);
  };

  traverse(ast);
  return variableDeclarations;
};
