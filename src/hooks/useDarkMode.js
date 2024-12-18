// hooks/useDarkMode.js

import { useState, useEffect } from 'react';

const useDarkMode = (initialState) => {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    // Check if dark mode preference is already saved in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setValue(savedMode === 'true');
    } else {
      localStorage.setItem('darkMode', value.toString());
    }
  }, []);

  const toggle = () => {
    setValue((prev) => {
      const newValue = !prev;
      localStorage.setItem('darkMode', newValue.toString());
      return newValue;
    });
  };

  return { value, toggle };
};

export default useDarkMode;
