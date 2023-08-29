import React from 'react';
import ReactCodesInput from 'react-codes-input';

interface SeminarInputProps {
  disabled?: boolean;
  helperText?: string;
  setInputCode: (res: string) => void;
  inputCode: string;
}

const SeminarInput = ({ disabled, helperText, setInputCode, inputCode }: SeminarInputProps) => {
  return (
    <div>
      <ReactCodesInput
        disabled={disabled}
        value={disabled ? inputCode : ''}
        type="number"
        onChange={setInputCode}
        codeLength={4}
        classNameCodeWrapperFocus="!border-0"
        classNameWrapper="flex h-[52px] w-[192px] justify-between"
        classNameCodeWrapper="w-[42px] border-b-2 border-pointBlue text-white bg-subBlack text-3xl text-center pt-2"
      />

      <div className="my-[4px] flex items-center justify-center text-small text-red-500">{helperText}</div>
    </div>
  );
};

export default SeminarInput;
