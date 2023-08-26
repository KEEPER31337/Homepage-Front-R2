import React from 'react';
import AuthCode from 'react-auth-code-input';

interface SeminarInputProps {
  disabled?: boolean;
  helperText?: string;
  setInputCode: (res: string) => void;
  inputCode: string;
}

const SeminarInput = ({ disabled, helperText, setInputCode, inputCode }: SeminarInputProps) => {
  // <input key={key} style={inputStyle} disabled value={inputCode[key]} />;

  return (
    <div>
      {disabled ? (
        <AuthCode
          disabled
          placeholder="1234"
          key={inputCode}
          allowedCharacters="numeric"
          onChange={setInputCode}
          length={4}
          containerClassName="flex h-[52px] w-[192px] justify-between"
          inputClassName="w-[50px] border border-pointBlue bg-transparent text-3xl text-center mr-3 focus:outline-none"
        />
      ) : (
        <AuthCode
          allowedCharacters="numeric"
          onChange={setInputCode}
          length={4}
          containerClassName="flex h-[52px] w-[192px] justify-between"
          inputClassName="w-[50px] border border-pointBlue bg-transparent text-3xl text-center mr-3 focus:outline-none"
          autoFocus
        />
      )}
      <div className="my-[4px] flex items-center justify-center text-small text-red-500">{helperText}</div>
    </div>
  );
};

export default SeminarInput;
