import React, { ReactNode } from 'react';

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
  helperText?: ReactNode;
}
const SeminarInput = ({ disabled, helperText }: SeminarInputProps) => {
  const inputListKey = [0, 1, 2, 3];
  return (
    <div className="mx-auto my-[22px]">
      <div className="flex h-[52px] w-[192px] justify-between">
        {inputListKey.map((key) => {
          return <input key={key} style={inputStyle} maxLength={1} disabled={disabled} />;
        })}
      </div>
      <div className="my-[4px] flex items-center justify-center text-small text-red-500">{helperText}</div>
    </div>
  );
};

export default SeminarInput;
