import { useGetBlockListQuery } from '@api/aboutApi';
import React from 'react';
import { SubTitleImagesInfo } from '@api/dto';

const SubTitleImageCard = ({ subtitleImage }: { subtitleImage: SubTitleImagesInfo }) => {
  return (
    <div className="w-full whitespace-pre-line px-10 leading-10">
      <p className="mb-8 text-2xl font-bold text-pointBlue">{subtitleImage?.subtitle}</p>
      <p className="bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent">
        {subtitleImage?.staticWriteContents?.map((staticWriteInfo) => `${staticWriteInfo?.content}\n`)}
      </p>
    </div>
  );
};

const Activity = () => {
  const { data } = useGetBlockListQuery({ type: 'activity' });

  return (
    <div className="bg-mainBlack">
      {data?.subtitleImages?.map((subtitleImage, index) =>
        index % 2 === 0 ? (
          <div className="grid grid-cols-[40%_60%] place-items-center text-left">
            <img src={subtitleImage.thumbnailPath || '/img/image3.png'} alt="" />
            <SubTitleImageCard subtitleImage={subtitleImage} />
          </div>
        ) : (
          <div className="grid grid-cols-[40%_60%] place-items-center text-right">
            <SubTitleImageCard subtitleImage={subtitleImage} />
            <img src={subtitleImage.thumbnailPath || '/img/image2.png'} alt="" />
          </div>
        ),
      )}
    </div>
  );
};

export default Activity;
