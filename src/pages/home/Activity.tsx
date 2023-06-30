import { useGetBlockListQuery } from '@api/aboutApi';
import React from 'react';
import LogoNeon from '@assets/logo/logo_neon.svg';
import { SubTitleImagesInfo } from '@api/dto';

const SubTitleImageCard = ({ subtitleImage }: { subtitleImage: SubTitleImagesInfo }) => {
  return (
    <div className="gird-cols-[45%_55%] group grid grid-flow-col place-items-center text-left even:text-right">
      <img
        className={`h-[950px] group-even:order-last ${
          subtitleImage?.thumbnailPath ? 'w-full object-cover' : 'w-96 object-contain'
        }`}
        src={subtitleImage?.thumbnailPath || LogoNeon}
        alt=""
      />
      <div className="w-full whitespace-pre-line px-10 leading-10">
        <p className="mb-8 text-3xl font-bold text-pointBlue">{subtitleImage?.subtitle}</p>
        <p className="bg-gradient-to-b from-gray-500 to-white bg-clip-text text-xl text-transparent">
          {subtitleImage?.staticWriteContents?.map((staticWriteInfo) => `${staticWriteInfo?.content}\n\n`)}
        </p>
      </div>
    </div>
  );
};

const Activity = () => {
  const { data } = useGetBlockListQuery({ type: 'activity' });

  return (
    <div className="bg-mainBlack">
      {data?.subtitleImages?.map((subtitleImage) => (
        <SubTitleImageCard key={subtitleImage.id} subtitleImage={subtitleImage} />
      ))}
    </div>
  );
};

export default Activity;
