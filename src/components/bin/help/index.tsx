import React from 'react';
import { Binary } from 'utils/providers/ShellProvider';
import { bins } from 'components/bin';
import { getHelpPage } from 'components/bin';
import { Indented, Option } from './styled';
import { HelpOption } from 'interfaces/CommandHelp';

export const help: Binary = ({ terminate, args }) => {
  terminate();

  if (args.length === 0) {
    return () => (
      <>
        <div>Available commands:</div>
        <br />
        <div>{Object.keys(bins).join(', ')}</div>
        <br />
        <div>Type: help [command] to display information about builtin commands.</div>
      </>
    );
  }

  const helpPage = getHelpPage(args[0]);

  if (!helpPage) {
    return () => <div>Unknown command {args[0]}</div>;
  }

  return () => {
    const renderHelpList = (list: HelpOption[] | undefined, name: string) => {
      if (!list || list?.length === 0) return;

      return (
        <>
          <div>{name}</div>
          <Indented>
            {list.map(opt => (
              <Option key={opt.text}>
                - <span>{opt.text}</span>: {opt.description}
              </Option>
            ))}
          </Indented>
        </>
      );
    };

    return (
      <>
        <div>NAME</div>
        <Indented>{helpPage.name}</Indented>
        <div>SYNOPSIS</div>
        <Indented>{helpPage.usage}</Indented>
        {renderHelpList(helpPage.args, 'ARGS')}
        {renderHelpList(helpPage.options, 'OPTIONS')}
        {renderHelpList(helpPage.examples, 'EXAMPLES')}
      </>
    );
  };
};
