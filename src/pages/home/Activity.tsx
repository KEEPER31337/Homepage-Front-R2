import React from 'react';

const demoTitle = '정기활동 입니다.';
const demoContents = '이것 저것 합니다.\n요것 저것 합니다.\n여러가지 합니다.';

const Activity = () => {
  return (
    <div className="bg-mainBlack">
      <div className="flex w-full flex-row place-items-center">
        <img src="/img/image3.png" alt="" className="w-[40%]" />
        <div className="flex w-[60%] flex-col whitespace-pre-line px-10 text-left leading-10">
          <p className="mb-8 text-2xl font-bold text-pointBlue">{demoTitle}</p>
          <p className="bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent">{demoContents}</p>
        </div>
      </div>
      <div className="flex w-full flex-row place-items-center">
        <div className="flex w-[40%] flex-col whitespace-pre-line px-10 text-left leading-10">
          <p className="mb-8 text-2xl font-bold text-pointBlue">{demoTitle}</p>
          <p className="bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent">{demoContents}</p>
        </div>
        <img src="/img/image2.png" alt="" className="w-[60%]" />
      </div>
    </div>
  );
};

export default Activity;
