import React, { useState } from 'react';

import Input from './input';
import Square from './Square';

const TestPage = () => {
  const [colorValue, setColorValue] = useState('');
  const [hexValue, setHexValue] = useState('');
  const [isDarkText, setIsDarkText] = useState(false);
  return (
    <div className="test-page">
      <Square 
        colorValue={colorValue}
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <Input
        colorValue={colorValue}
        setColorValue={setColorValue}
        setHaxValue={setHexValue}
        isDarkText={isDarkText}
        setIsDarkText={setIsDarkText}
      />
    </div>
  );
};

export default TestPage;