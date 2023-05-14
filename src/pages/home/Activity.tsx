import { useGetBlockListQuery } from '@api/aboutApi';
import React from 'react';

const Activity = () => {
  const { data } = useGetBlockListQuery({ type: 'activity' });

  return (
    <div className="bg-mainBlack">
      {data?.subtitleImages?.map((subtitleImage, index) =>
        index % 2 === 0 ? (
          <div key={subtitleImage.id} className="flex w-full flex-row place-items-center">
            <img src="/img/image3.png" alt="" className="w-[40%]" />
            <div className="flex w-[60%] flex-col whitespace-pre-line px-10 text-left leading-10">
              <p className="mb-8 text-2xl font-bold text-pointBlue">{subtitleImage?.subtitle}</p>
              <p className="bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent">
                {subtitleImage?.staticWriteContents?.map((staticWriteInfo) => `${staticWriteInfo?.content}\n`)}
              </p>
            </div>
          </div>
        ) : (
          <div key={subtitleImage.id} className="flex w-full flex-row place-items-center">
            <div className="flex w-[40%] flex-col whitespace-pre-line px-10 text-left leading-10">
              <p className="mb-8 text-2xl font-bold text-pointBlue">{subtitleImage?.subtitle}</p>
              <p className="bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent">
                {subtitleImage?.staticWriteContents?.map((staticWriteInfo) => `${staticWriteInfo?.content}\n`)}
              </p>
            </div>
            <img src="/img/image2.png" alt="" className="w-[60%]" />
          </div>
        ),
      )}
    </div>
  );
};

export default Activity;
