import React, { useState } from 'react';
import { ThemeProvider, Input, Select, Option, Button } from '@material-tailwind/react';

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

  const inputTheme = {
    input: {
      styles: {
        base: {
          container: {
            minWidth: 'max-w-[42px]',
          },
          input: {
            borderRadius: '!rounded-none',
            bgColor: '!bg-white',
            height: 'h-[52px]',
          },
        },
      },
    },
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

  return (
    <ThemeProvider value={inputTheme}>
      <div className="mx-auto my-[22px] flex h-[52px] w-[192px] justify-between">
        <Input disabled />
        <Input disabled />
        <Input disabled />
        <Input disabled />
      </div>
      <Button
        onClick={startSeminar}
        className="font-small mx-auto mb-[19px] block flex h-[34px] w-[71px] items-center whitespace-nowrap bg-pointBlue text-mainBlack"
      >
        시작
      </Button>
      {seminarExist ? (
        <>
          <div className=" mx-auto mb-[11px] flex w-[108px] justify-center whitespace-nowrap">
            <p className="mr-3">출석</p>
            <p className="text-white">02:30</p>
          </div>
          <div className="mx-auto flex w-[108px] justify-center whitespace-nowrap">
            <p className="mr-3">지각</p>
            <p className="text-white">05:00</p>
          </div>
        </>
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
