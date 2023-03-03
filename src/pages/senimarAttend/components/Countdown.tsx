import React from 'react';

const Countdown = () => {
  return (
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
  );
};

export default Countdown;
