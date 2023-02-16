import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { ThemeProvider, Card, CardBody, Typography, Input, Button, Select, Option } from '@material-tailwind/react';
import FilledButton from '@components/Button/FilledButton';
import PageTitle from '@components/Typography/PageTitle';

const SeminarAttend = () => {
  const [seminarDate, setSeminarDate] = useState('today');

  useEffect(() => {
    setSeminarDate(DateTime.now().toFormat('yy.MM.dd'));
  }, []);

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
    <div className="flex h-screen items-center justify-center">
      <ThemeProvider value={inputTheme}>
        <Card className="h-[426px] w-96 bg-mainBlack">
          <CardBody className="my-auto h-[281px] content-between items-center p-0 text-pointBlue">
            <Typography className="text-center text-h3 font-bold">출석체크</Typography>
            <Typography className="text-center text-paragraph text-white">{seminarDate} 세미나</Typography>
            <div className="mx-auto my-[22px] flex h-[52px] w-[192px] justify-between">
              <Input disabled />
              <Input disabled />
              <Input disabled />
              <Input disabled />
            </div>
            <Button className="font-small mx-auto mb-[19px] block flex h-[34px] w-[71px] items-center whitespace-nowrap bg-pointBlue text-mainBlack">
              시작
            </Button>
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
          </CardBody>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default SeminarAttend;
