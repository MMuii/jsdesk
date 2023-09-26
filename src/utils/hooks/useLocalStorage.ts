import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options?: { saveInitialValueToLocalStorageIfItemIsUndefined: boolean },
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item && options?.saveInitialValueToLocalStorageIfItemIsUndefined) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
};
