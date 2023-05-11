import { useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { FiChevronRight, FiChevronsLeft } from 'react-icons/fi';
import { MdDangerous } from 'react-icons/md';
import { Output } from 'utils/hooks/useREPL/types';
import Prism from 'prismjs';
import { Container } from './styled';

const getOutputIcon = (outputType: string) => {
  switch (outputType) {
    case 'output':
      return <FiChevronsLeft />;
    case 'input':
      return <FiChevronRight />;
    case 'error':
      return <MdDangerous />;
    default:
      return null;
  }
};

export const run: Binary = ({ terminate, args }) => {
  terminate();

  return () => {
    const [output, setOutput] = useState<Output[]>([]);

    useEffect(() => {
      const originalConsoleLog = console.log;

      console.log = (msg: string) => {
        setOutput(prev => [...prev, { text: msg, type: 'log' }]);
      };

      return () => {
        console.log = originalConsoleLog;
      };
    }, []);

    const renderOutput = () => {
      return output.map((row, idx) => {
        return (
          <div className={row.type} key={idx}>
            {getOutputIcon(row.type)}
            <pre>
              <code className="lang-js">{row.text}</code>
            </pre>
          </div>
        );
      });
    };

    useEffect(() => {
      try {
        let result = eval(args[0]);
        if (result === undefined) {
          result = 'undefined';
        }

        setOutput(prev => [...prev, { text: result, type: 'output' }]);
        Prism.highlightAll();
      } catch (err) {
        const errorMessage = (err as Error).stack?.split('\n')[0] as string;
        console.error(err);
        setOutput(prev => [...prev, { text: errorMessage, type: 'error' }]);
      }
    }, []);

    return <Container>{renderOutput()}</Container>;
  };
};
