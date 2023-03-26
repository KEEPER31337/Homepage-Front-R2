import React, { useRef, useState } from 'react';

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
  const focusInput0 = useRef<HTMLInputElement>(null);
  const focusInput1 = useRef<HTMLInputElement>(null);
  const focusInput2 = useRef<HTMLInputElement>(null);
  const focusInput3 = useRef<HTMLInputElement>(null);
  const inputList = [focusInput0, focusInput1, focusInput2, focusInput3];
  const [inputCode, setSeminarInput] = useState([0, 0, 0, 0]);
  const validCode = '1234'; // 임시

  const moveNextInput = (value: string, index: number) => {
    if (value) {
      inputCode[index] = Number(value);
      setSeminarInput([...inputCode]);
      switch (index) {
        case 0:
          focusInput1.current?.focus();
          break;
        case 1:
          focusInput2.current?.focus();
          break;
        case 2:
          focusInput3.current?.focus();
          break;
        case 3:
          setInputCode?.(inputCode.join(''));
          break;
        default:
          break;
      }
    }
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
              onChange={(e) => {
                moveNextInput(e.target.value, key);
              }}
              ref={inputList[key]}
            />
          );
        })}
      </div>
      <div className="my-[4px] flex items-center justify-center text-small text-red-500">{helperText}</div>
    </div>
  );
};

export default SeminarInput;
