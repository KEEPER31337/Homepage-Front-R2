/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { VscCircleFilled } from 'react-icons/vsc';
// import { ChevronDownIcon } from '@heroicons/react/solid';
// import { ViewGridIcon } from '@heroicons/react/outline';

interface SidebarContentsProps {
  category: any;
}

const SidebarContents = ({ category }: SidebarContentsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [categoryTint, setCategoryTint] = useState<string>('');
  useEffect(() => {
    setCategoryTint('flex items-center font-light text-white pl-[50px] w-full h-[45px] bg-[#131316]');
  }, [category]);

  const categoryClicked = (id: number) => {
    setSelectedCategory(id);
  };

  useEffect(() => {
    console.log(selectedCategory);
    if (selectedCategory % 10 === category.id) {
      setCategoryTint('flex items-center text-white pl-[50px] w-full h-[45px] bg-[#4ceef9]/30 font-medium ');
    } else setCategoryTint('flex items-center font-light text-white pl-[50px] w-full h-[45px] bg-[#131316]');
  }, [selectedCategory]);

  return (
    <Popover>
      <Popover.Button className={categoryTint}>
        <div>{category?.name}</div>
      </Popover.Button>
      <Popover.Panel>
        <div className="flex flex-col relative bg-[#131316] font-light text-white">
          {category.subs.map((item: any) => {
            if (item.id >= 1000) {
              return (
                <div className="flex items-center pl-[50px] mt-[10px] h-[40px] text-sm font-light">{item.name}</div>
              );
            }
            if (item.id === selectedCategory) {
              return (
                <Link to="#!" className="flex items-center pl-[50px] h-[40px] ">
                  <VscCircleFilled className="inline-block" />
                  <div className="inline-block">&nbsp;{item.name}</div>
                </Link>
              );
            }
            return (
              <Link to="#!" className="flex items-center pl-[50px] h-[40px]" onClick={() => categoryClicked(item.id)}>
                <VscCircleFilled className="inline-block" />
                <div className="inline-block">&nbsp;{item.name}</div>
              </Link>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default SidebarContents;
