import React from 'react';
import { useGetBlockListQuery } from '@api/aboutApi';
import { SubTitleImagesInfo } from '@api/dto';
import LogoNeon from '@assets/logo/logo_neon.svg';

const imagePath = [
  null,
  null,
  '/img/main/activity_study.png',
  '/img/main/activity_seminar.png',
  '/img/main/activity_docs.png',
];

const SubTitleImageCard = ({ subtitleImage }: { subtitleImage: SubTitleImagesInfo }) => {
  return (
    <div className="group sm:grid sm:grid-cols-[45%_55%]">
      <div className="flex place-content-center place-items-center group-even:order-last">
        <img
          className={imagePath?.[subtitleImage?.id] ? 'h-full object-cover' : 'h-[960px] w-96 object-contain'}
          src={imagePath?.[subtitleImage?.id] || LogoNeon}
          alt={subtitleImage?.subtitle}
        />
      </div>
      <div className="flex flex-col place-content-center px-14 py-10 text-left">
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
