import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Popover, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { VscCircleFilled } from 'react-icons/vsc';
import { SidebarCategoryState, SidebarSubcategoryState } from '../../../atoms';

interface SidebarContentsProps {
  category: any;
  styles: string;
}

const SidebarContents = ({ category, styles }: SidebarContentsProps) => {
  const [currentCategory, setCurrentCategory] = useRecoilState(SidebarCategoryState(0));
  const [currentSubcategory, setCurrentSubcategory] = useRecoilState(SidebarSubcategoryState(0));

  return (
    <Popover>
      <Popover.Button className={styles} onClick={() => setCurrentCategory(category.id)}>
        <div>{category?.name}</div>
      </Popover.Button>
      <Popover.Panel>
        <div className="flex flex-col relative bg-[#131316] text-white">
          {category.subs.map((item: any) => {
            if (currentSubcategory === item.id && item.id % 10 === currentCategory) {
              return (
                <Link to="#!" className="flex items-center pl-[50px] h-[40px] text-[#4CEEF9]">
                  <VscCircleFilled className="inline-block" />
                  <div className="inline-block">&nbsp;{item.name}</div>
                </Link>
              );
            }
            if (item.id >= 1000) {
              return (
                <div className="flex items-center pl-[50px] mt-[10px] h-[40px] text-sm font-light">{item.name}</div>
              );
            }
            return (
              <Link
                to="#!"
                className="flex items-center pl-[50px] h-[40px] text-white"
                onClick={() => setCurrentSubcategory(item.id)}
              >
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
