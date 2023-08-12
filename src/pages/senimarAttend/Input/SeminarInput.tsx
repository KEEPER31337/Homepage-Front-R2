import React from 'react';

const inputStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '28px',
  height: '52px',
  maxWidth: '42px',
  color: 'white',
  background: '#26262C',
  borderBottom: '1px solid #4CEEF9',
};

interface SeminarInputProps {
  disabled?: boolean;
  helperText?: string;
  setInputCode?: React.Dispatch<React.SetStateAction<number[]>>;
  inputCode: number[];
}

const SeminarInput = ({ disabled, helperText, setInputCode, inputCode }: SeminarInputProps) => {
  const inputListKey = [0, 1, 2, 3];

  const moveNextInput = (event: React.KeyboardEvent<HTMLInputElement>, key: number) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length === target.maxLength && target.nextElementSibling) {
      const nextSibling = target.nextElementSibling as HTMLInputElement;
      nextSibling.focus();
    }
    if (event.key === 'Backspace') {
      if (target.value.length !== target.maxLength && target.previousElementSibling) {
        const previousSibling = target.previousElementSibling as HTMLInputElement;
        previousSibling.focus();
      }
    }
    const copyInputCode = [...inputCode];
    copyInputCode[key] = Number(target.value);
    setInputCode?.(copyInputCode);
  };

  return (
    <div>
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
