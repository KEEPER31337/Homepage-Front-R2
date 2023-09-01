import React from 'react';
import { useGetBlockListQuery } from '@api/aboutApi';

const Excellence = () => {
  const { data: excellenceList } = useGetBlockListQuery({ type: 'excellence' });

  return (
    <div className="flex w-full flex-row bg-mainBlack">
      <img src="/img/main/excellence.png" alt="" className="w-[60%]" />
      <div className="flex w-full flex-col place-content-center px-10">
        {excellenceList?.subtitleImages?.map((subtitleImage) => (
          <div
            key={subtitleImage.id}
            className="w-full whitespace-pre-line border-b-2 border-pointBlue py-8 text-left leading-7 last:border-0"
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
