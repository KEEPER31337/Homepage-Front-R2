import React, { useState } from 'react';
import { ThemeProvider, Typography } from '@material-tailwind/react';
import Countdown from './Countdown';
import SeminarButton from './SeminarButton';

const inputStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '28px',
  fontWeight: '600',
  height: '52px',
  maxWidth: '42px',
  color: 'black',
};

const MemberCardComponent = () => {
  const inputListKey = [0, 1, 2, 3]; // key값 어떻게 줘야할지 모르겠어서 이렇게 했습니다 좋은방법좀ㅠㅠ
  const [componentIncorrectAlert, setComponentIncorrectAlert] = useState(<p className="mb-[22px]" />);
  const [seminarExist, setSeminarExist] = useState(true); // TODO: api로 교체

  return seminarExist ? (
    <ThemeProvider>
      <div className="mx-auto mt-[22px] flex h-[52px] w-[192px] justify-between">
        {inputListKey.map((key) => {
          return <input key={key} style={inputStyle} maxLength={1} />;
        })}
      </div>
      <div className="mx-auto flex items-center justify-center text-small text-red-500">{componentIncorrectAlert}</div>
      <SeminarButton>출석</SeminarButton>
      <Countdown />
    </ThemeProvider>
  ) : (
    <Typography className="text-center text-h3 font-bold">예정된 세미나가 없습니다.</Typography>
  );
};

export default MemberCardComponent;
