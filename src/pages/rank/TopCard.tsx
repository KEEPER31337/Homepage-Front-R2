import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TopCardProps<T extends Record<string, any>> {
  item: T;
  message: string;
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopCard = <T extends Record<string, any>>({ item, message, index }: TopCardProps<T>) => {
  return (
    <div key={item.id} className="relative h-40 w-full">
      <div className="absolute h-full w-full pr-4 pb-4">
        <div className="flex h-full w-full bg-mainBlack p-4">
          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex">
              <p className="border-[1px] border-pointBlue px-3 py-1 text-xl text-pointBlue">{index + 1}</p>
              <p className="my-auto ml-2 text-2xl font-bold">{item.name}</p>
              <p className="my-auto ml-2">{item.no}기</p>
            </div>
            <p className="text-pointBlue">{message}</p>
          </div>
          <img alt="profile" src="/img/sampleProfile.svg" className="mr-2 h-full object-contain" />
        </div>
      </div>
      <div className="h-full w-full pt-4 pl-4">
        <div className="h-full w-full border-2 border-pointBlue" />
      </div>
    </div>
  );
};

export default TopCard;
