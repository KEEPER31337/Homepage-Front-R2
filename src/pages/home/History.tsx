import React from 'react';
import { useGetBlockListQuery } from '@api/aboutApi';
import { SubTitleImagesInfo } from '@api/dto';

const HistoryItem = ({ subtitleImage }: { subtitleImage: SubTitleImagesInfo }) => {
  return (
    <>
      <div className="flex place-items-center">
        <div className="relative h-7 w-7 rounded-full border-2 border-pointBlue" />
        <p className="ml-8 text-xl font-bold text-pointBlue">{subtitleImage?.subtitle}</p>
      </div>
      <ul className="ml-[13px] list-disc border-l-2 border-pointBlue pb-16 pl-16 pt-3 last:border-0">
        {subtitleImage?.staticWriteContents?.map((staticWriteContent) => (
          <li key={staticWriteContent.id}>
            <p>{staticWriteContent.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

const History = () => {
  const { data: historyList } = useGetBlockListQuery({ type: 'history' });
  const subtitleImages = historyList?.subtitleImages
    ?.filter((subtitleImage) => subtitleImage?.staticWriteContents?.length)
    .reverse();

  return (
    <div className="w-full">
      <div className="w-full bg-gradient-to-b from-middleBlack via-middleBlack to-90% pl-40 pt-60">
        {subtitleImages?.map((subtitleImage) => (
          <HistoryItem subtitleImage={subtitleImage} key={subtitleImage.id} />
        ))}
      </div>
      <img alt="firework" src="/img/main/firework.png" className="w-full object-fill" />
    </div>
  );
};

export default History;
