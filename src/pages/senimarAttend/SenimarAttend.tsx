import React, { useState } from 'react';
import { ThemeProvider, Card, CardBody, Typography, Input, Button, Select, Option } from '@material-tailwind/react';

const SeminarAttend = () => {
  const [seminarDate, setSeminarDate] = useState('23.01.04');
  const [attendValue, setAttendValue] = useState('5분');
  const [lateAttendValue, setLateAttendValue] = useState('5분');

  const handleAttendChange = (value: string) => {
    setAttendValue(value);
  };
  const handleLateChange = (value: string) => {
    setLateAttendValue(value);
  };

  const inputTheme = {
    input: {
      styles: {
        base: {
          container: {
            minWidth: 'max-w-[42px]',
          },
          input: {
            fontSize: 'text-[16px]',
            borderRadius: '!rounded-none',
            fontColor: '!text-white',
            placeholder: 'placeholder:text-subGray',
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
    <div className="flex justify-center h-screen items-center">
      <ThemeProvider value={inputTheme}>
        <Card className="h-[426px] w-96 bg-mainBlack">
          <CardBody className="my-auto p-0 h-[281px] content-between text-pointBlue items-center">
            <Typography variant="h5" className="text-center">
              출석체크
            </Typography>
            <Typography variant="h5" className="text-center font-extralight text-white">
              {seminarDate} 세미나
            </Typography>
            <div className="h-[52px] flex justify-between w-[192px] mx-auto my-[22px]">
              <Input />
              <Input />
              <Input />
              <Input />
            </div>
            <Button className="mx-auto mb-[19px] block h-[34px] w-[71px] bg-pointBlue whitespace-nowrap flex items-center">
              시작
            </Button>
            <div className=" flex w-[169px] mx-auto items-end whitespace-nowrap">
              <p className="mr-3">출석</p>
              <Select variant="standard" value={attendValue} onChange={() => handleAttendChange}>
                <Option value="5분">5분</Option>
                <Option value="10분">10분</Option>
                <Option value="15분">15분</Option>
              </Select>
            </div>
            <div className="flex w-[169px] mx-auto items-end">
              <p className="mr-3">지각</p>
              <Select variant="standard" value={lateAttendValue} onChange={() => handleLateChange}>
                <Option value="5분">5분</Option>
                <Option value="10분">10분</Option>
                <Option value="15분">15분</Option>
              </Select>
            </div>
          </CardBody>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default SeminarAttend;
