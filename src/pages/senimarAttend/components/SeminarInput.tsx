import React from 'react';

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
  disabled: boolean;
}
const SeminarInput = ({ disabled }: SeminarInputProps) => {
  const inputListKey = [0, 1, 2, 3]; // key값 어떻게 줘야할지 모르겠어서 이렇게 했습니다 좋은방법좀ㅠㅠ

  return (
    <div className="mx-auto my-[22px] flex h-[52px] w-[192px] justify-between">
      {inputListKey.map((key) => {
        return <input key={key} style={inputStyle} maxLength={1} disabled={disabled} />;
      })}
    </div>
  );
};

export default SeminarInput;
