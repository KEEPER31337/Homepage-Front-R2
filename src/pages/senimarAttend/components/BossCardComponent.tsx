import React, { useState } from 'react';
import { ThemeProvider, Select, Option } from '@material-tailwind/react';
import Countdown from './Countdown';
import SeminarButton from './SeminarButton';
import SeminarSelector from './SeminarSelector';

const BossCardComponent = () => {
  const [attendValue, setAttendValue] = useState<number>(5);
  const [lateAttendValue, setLateAttendValue] = useState<number>(5);
  const [seminarExist, setSeminarExist] = useState(false); // Todo: api 적용

  const startSeminar = () => {
    setSeminarExist(true);
  };

  const selectTheme = {
    select: {
      styles: {
        base: {
          container: {
            minWidth: 'w-32',
            maxHeight: 'h-[37px]',
          },
          select: {
            color: 'text-white',
            borderColor: '!border-white',
          },
          arrow: {
            initial: {
              margin: 'mt-[5px]',
              fontColor: '!text-white',
              height: 'h-[16px]',
              innerWidth: 'w-[16px]',
            },
          },
        },
      },
    },
  };

  const inputStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
    height: '52px',
    maxWidth: '42px',
    color: 'black',
    background: 'white',
  };

  return (
    <ThemeProvider value={selectTheme}>
      <div className="mx-auto my-[22px] flex h-[52px] w-[192px] justify-between">
        <input disabled style={inputStyle} />
        <input disabled style={inputStyle} />
        <input disabled style={inputStyle} />
        <input disabled style={inputStyle} />
      </div>
      <SeminarButton onClick={startSeminar}>시작</SeminarButton>
      {seminarExist ? (
        <Countdown />
      ) : (
        <>
          <SeminarSelector limitValue={attendValue} setLimitValue={setAttendValue}>
            출석
          </SeminarSelector>
          <SeminarSelector limitValue={lateAttendValue} setLimitValue={setLateAttendValue}>
            지각
          </SeminarSelector>
        </>
      )}
    </ThemeProvider>
  );
};

export default BossCardComponent;
