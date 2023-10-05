import React from 'react';
import { useGetBlockListQuery } from '@api/aboutApi';

const Excellence = () => {
  const { data: excellenceList } = useGetBlockListQuery({ type: 'excellence' });

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-mainBlack sm:h-auto sm:flex-row">
      <img
        src="/img/main/excellence.png"
        alt="동아리 자랑 이미지"
        className="absolute inset-0 h-full w-full object-cover opacity-10 sm:static sm:w-[55%] sm:opacity-100"
      />
      <div className="z-10 flex w-full flex-col place-content-center px-10">
        {excellenceList?.subtitleImages?.map((subtitleImage) => (
          <div
            key={subtitleImage.id}
            className="min-h-[200px] w-full whitespace-pre-line border-b-2 border-pointBlue py-8 text-left leading-7 last:border-0"
          >
            <p className="mb-5 ml-5 text-2xl font-bold text-pointBlue">{subtitleImage?.subtitle}</p>
            <p className="ml-10 bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent">
              {subtitleImage?.staticWriteContents?.map((staticWriteInfo) => `${staticWriteInfo?.content}\n`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Excellence;
