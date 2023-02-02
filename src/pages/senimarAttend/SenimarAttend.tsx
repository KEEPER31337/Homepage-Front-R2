import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react';

const SeminarAttend = () => {
  const [seminarDate, setSeminarDate] = useState('23.01.04');
  return (
    <div className="flex justify-center h-screen items-center">
      <Card className="h-[426px] w-96 bg-mainBlack">
        <CardBody className="my-auto border text-pointBlue">
          <Typography variant="h5" className="text-center mb-2">
            출석체크
          </Typography>
          <Typography variant="h5" className="text-center font-extralight text-white">
            {seminarDate} 세미나
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default SeminarAttend;
