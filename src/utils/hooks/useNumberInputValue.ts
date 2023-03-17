import { useEffect, useState } from 'react';

export const useNumberInputValue = (initialValue: number, range?: { min: number; max: number }) => {
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(initialValue.toString());

  useEffect(() => {
    const numberVal = parseInt(inputValue);
    if (isNaN(numberVal)) {
      return;
    }

    if (!range) {
      setValue(numberVal);
      return;
    }

    if (numberVal >= range.min && numberVal <= range.max) {
      setValue(numberVal);
    } else if (numberVal < range.min) {
      setValue(range.min);
    } else if (numberVal > range.max) {
      setValue(range.max);
    }
  }, [inputValue, range]);

  const setNewValue = (newValue: number) => {
    setValue(newValue);
    setInputValue(newValue.toString());
  };

  const handleBlur = () => {
    const numberVal = parseInt(inputValue);
    if (isNaN(numberVal)) {
      setValue(initialValue);
      setInputValue(initialValue.toString());
      return;
    }

    if (range) {
      if (numberVal < range.min) {
        setValue(range.min);
        setInputValue(range.min.toString());
      } else if (numberVal > range.max) {
        setValue(range.max);
        setInputValue(range.max.toString());
      }
    }
  };

  return {
    value,
    setValue: setNewValue,
    inputProps: {
      type: 'number',
      min: range?.min,
      max: range?.max,
      value: inputValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
      onBlur: handleBlur,
    },
  };
};
