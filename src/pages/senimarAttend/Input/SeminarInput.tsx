import React, { useState } from 'react';

const inputStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '28px',
  fontWeight: '600',
  height: '52px',
  maxWidth: '42px',
  color: 'black',
  background: 'white',
};

interface SeminarInputProps {
  disabled?: boolean;
  helperText?: string;
  setInputCode?: React.Dispatch<React.SetStateAction<string>>;
}
const SeminarInput = ({ disabled, helperText, setInputCode }: SeminarInputProps) => {
  const inputListKey = [0, 1, 2, 3];
  const [inputCode, setSeminarInput] = useState([0, 0, 0, 0]);

  const moveNextInput = (event: React.KeyboardEvent<HTMLInputElement>, key: number) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length === target.maxLength && target.nextElementSibling) {
      const nxtSibling = target.nextElementSibling as HTMLInputElement;
      nxtSibling.focus();
    }
    if (event.key === 'Backspace') {
      if (target.value.length !== target.maxLength && target.previousElementSibling) {
        const prvSibling = target.previousElementSibling as HTMLInputElement;
        prvSibling.focus();
      }
    }
    inputCode[key] = Number(target.value);
    setSeminarInput([...inputCode]);
    setInputCode?.(inputCode.join(''));
  };

  return (
    <div className="mx-auto my-[22px]">
      <div className="flex h-[52px] w-[192px] justify-between">
        {inputListKey.map((key) => {
          return (
            <input
              key={key}
              style={inputStyle}
              maxLength={1}
              disabled={disabled}
              onKeyUp={(e) => {
                moveNextInput(e, key);
              }}
            />
          );
        })}
      </div>
      <div className="my-[4px] flex items-center justify-center text-small text-red-500">{helperText}</div>
    </div>
  );
};

export default SeminarInput;
