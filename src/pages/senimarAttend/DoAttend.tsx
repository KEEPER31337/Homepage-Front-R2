import React, { useRef, useState } from 'react';
import { ThemeProvider, Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { VscCheck } from 'react-icons/vsc';

interface DoAttendProps {
  seminarDate: string;
}

const inputStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '28px',
  fontWeight: '600',
  height: '52px',
  maxWidth: '42px',
  color: 'black',
};

const DoAttend = ({ seminarDate }: DoAttendProps) => {
  const [isAttend, setIsAttend] = useState(false);

  const calAttendance = () => {
    setIsAttend(true);
  };

  return (
    <ThemeProvider>
      <Card className="h-[426px] w-96 bg-mainBlack">
        <CardBody className="my-auto h-[281px] content-between items-center p-0 text-pointBlue">
          <Typography className="text-center text-h3 font-bold">출석체크</Typography>
          <Typography className="text-center text-paragraph text-white">{seminarDate} 세미나</Typography>
          <div className="mx-auto my-[22px] flex h-[52px] w-[192px] justify-between">
            <input style={inputStyle} />
            <input style={inputStyle} />
            <input style={inputStyle} />
            <input style={inputStyle} />
          </div>
          {isAttend ? (
            <div className="mx-auto mb-[33px] flex h-[34px] items-center justify-center text-pointBlue">
              <VscCheck />
              <p className="ml-1">출석</p>
            </div>
          ) : (
            <Button
              className="font-small mx-auto mb-[33px] block flex h-[34px] w-[71px] items-center whitespace-nowrap bg-pointBlue text-mainBlack"
              onClick={() => {
                calAttendance();
              }}
            >
              출석
            </Button>
          )}
          <div className=" mx-auto mb-[11px] flex w-[108px] justify-center whitespace-nowrap">
            <p className="mr-3">출석</p>
            <p className="text-white">02:30</p>
          </div>
          <div className="mx-auto flex w-[108px] justify-center whitespace-nowrap">
            <p className="mr-3">지각</p>
            <p className="text-white">05:00</p>
          </div>
        </CardBody>
      </Card>
    </ThemeProvider>
  );
};

export default DoAttend;
