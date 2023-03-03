import React, { useState } from 'react';
import { ThemeProvider, Select, Option } from '@material-tailwind/react';
import Countdown from './Countdown';
import SeminarButton from './SeminarButton';

const BossCardComponent = () => {
  const [attendValue, setAttendValue] = useState('5분');
  const [lateAttendValue, setLateAttendValue] = useState('5분');
  const [seminarExist, setSeminarExist] = useState(false); // Todo: api 적용
  const handleAttendChange = (value: string) => {
    setAttendValue(value);
  };
  const handleLateChange = (value: string) => {
    setLateAttendValue(value);
  };

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
          <div className=" mx-auto flex w-[125px] items-end whitespace-nowrap">
            <p className="mr-3">출석</p>
            <Select variant="standard" value={attendValue} onChange={() => handleAttendChange}>
              <Option value="5분">5분</Option>
              <Option value="10분">10분</Option>
              <Option value="15분">15분</Option>
            </Select>
          </div>
          <div className="mx-auto flex w-[125px] items-end whitespace-nowrap">
            <p className="mr-3">지각</p>
            <Select variant="standard" value={lateAttendValue} onChange={() => handleLateChange}>
              <Option value="5분">5분</Option>
              <Option value="10분">10분</Option>
              <Option value="15분">15분</Option>
            </Select>
          </div>
        </>
      )}
    </ThemeProvider>
  );
};

export default BossCardComponent;
