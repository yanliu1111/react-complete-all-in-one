import colorNames from 'colornames'
import { useRef } from 'react';

function Input({colorValue, setColorValue, setHaxValue, isDarkText, setIsDarkText}) {
  const inputRef = useRef();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Enter Color Value</label>

      <input
        autoFocus
        ref={inputRef}
        type="text"
        placeholder="Enter Color Value"
        required
        value={colorValue}
        onChange={(e) => {
          setColorValue(e.target.value)
          setHaxValue(colorNames(e.target.value));
        }
        }
      />
      <button
        type="button"
        aria-label="Toggle Text Color"
        
        onClick={() => {
          setIsDarkText((prev) => !prev); // Toggle the text color
          inputRef.current.focus(); // Move focus to the input field
        }}
      >
        Toggle Text Color
      </button>
    </form>
  );
}

export default Input;