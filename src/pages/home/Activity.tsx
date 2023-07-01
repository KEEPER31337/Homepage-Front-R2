import { useGetBlockListQuery } from '@api/aboutApi';
import React from 'react';
import LogoNeon from '@assets/logo/logo_neon.svg';
import { SubTitleImagesInfo } from '@api/dto';

const SubTitleImageCard = ({ subtitleImage }: { subtitleImage: SubTitleImagesInfo }) => {
  return (
    <div className="group grid h-[960px] grid-cols-[45%_55%]">
      <div className="flex place-content-center place-items-center group-even:order-last">
        <img
          className={subtitleImage?.thumbnailPath ? 'w-full object-cover' : 'w-96 object-contain'}
          src={subtitleImage?.thumbnailPath || LogoNeon}
          alt={subtitleImage?.subtitle}
        />
      </div>
      <div className="flex flex-col place-content-center pl-14 text-left">
        <p className="mb-8 text-3xl font-bold text-pointBlue">{subtitleImage?.subtitle}</p>
        <p className="whitespace-pre-line bg-gradient-to-b from-gray-500 to-white bg-clip-text text-xl text-transparent">
          {subtitleImage?.staticWriteContents?.map((staticWriteInfo) => `${staticWriteInfo?.content}\n\n`)}
        </p>
      </div>
    </div>
  );
};

const Activity = () => {
  const { data: activityList } = useGetBlockListQuery({ type: 'activity' });

  return (
    <div className="bg-mainBlack">
      {activityList?.subtitleImages?.map((subtitleImage) => (
        <SubTitleImageCard key={subtitleImage.id} subtitleImage={subtitleImage} />
      ))}
    </div>
  );
};

export default Activity;
