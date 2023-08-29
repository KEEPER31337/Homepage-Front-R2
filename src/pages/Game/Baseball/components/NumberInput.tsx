import React from 'react';
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';

interface NumberInputProps {
  AuthInputRef: React.RefObject<AuthCodeRef>;
  onChange: (res: string) => void;
  error: boolean;
}

const NumberInput = ({ AuthInputRef, onChange, error }: NumberInputProps) => {
  return (
    <div>
      <AuthCode
        ref={AuthInputRef}
        allowedCharacters="numeric"
        onChange={onChange}
        length={4}
        containerClassName="ml-6"
        inputClassName="w-[50px] h-[60px] border border-dashed border-pointBlue bg-transparent text-3xl text-center mr-3 focus:outline-none"
        autoFocus
      />
      <div className="relative">
        {error && <p className="absolute left-5 top-2 text-center text-subRed">중복된 숫자가 있습니다</p>}
      </div>
    </div>
  );
};

export default NumberInput;
