import { useGetBlockListQuery } from '@api/aboutApi';
import React from 'react';

const demoTitle = '동아리 지원';
const demoContents = '도서 및 기자재 지원\n스터디룸 비용 지원\n회식비 지원';

const Excellence = () => {
  const { data: excellenceList } = useGetBlockListQuery({ type: 'excellence' });

  console.log(excellenceList);

  return (
    <div className="flex w-full flex-row bg-mainBlack">
      <img src="/img/main/excellence.png" alt="" className="w-[60%]" />
      <div className="flex w-full flex-col place-content-center px-10">
        {excellenceList?.subtitleImages?.map((subtitleImage) => (
          <div className="w-full whitespace-pre-line border-b-2 border-pointBlue py-8 text-left leading-7 last:border-0">
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
