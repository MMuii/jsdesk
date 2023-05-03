import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { RenderableProps } from 'interfaces/BinProps';
import { useREPL } from 'utils/hooks/useREPL';
import { MdDangerous } from 'react-icons/md';
import { FiChevronRight, FiChevronsLeft } from 'react-icons/fi';
import { Container, Input, InputContainer } from './styled';

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

export const Repl = ({ terminate }: RenderableProps) => {
  const [inputValue, setInputValue] = useState('');
  const { parseScript, output } = useREPL();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        terminate();
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [terminate]);

  useEffect(() => {
    Prism.highlightAll();
    console.info('output:', output);
  }, [output]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      parseScript(inputValue);
      setInputValue('');
    }
  };

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

  return (
    <Container>
      {renderOutput()}
      <InputContainer>
        <FiChevronRight />
        <Input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      </InputContainer>
    </Container>
  );
};
