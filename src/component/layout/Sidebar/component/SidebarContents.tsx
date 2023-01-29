import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { VscCircleFilled } from 'react-icons/vsc';
import { SidebarCategoryState, SidebarSubcategoryState } from '../../../../atoms';

interface SidebarContentsProps {
  category: any;
  isOpen: boolean;
}

const SidebarContents = ({ category, isOpen }: SidebarContentsProps) => {
  const [currentCategory, setCurrentCategory] = useRecoilState(SidebarCategoryState(0));
  const [currentSubcategory, setCurrentSubcategory] = useRecoilState(SidebarSubcategoryState(0));

  return (
    <div className="flex flex-col bg-mainBlack text-white">
      {category.subs.map((item: any) => {
        if (currentSubcategory === item.id && currentCategory === item.id % 10) {
          return (
            <Link
              to="#!"
              className={`flex items-center pl-[50px] h-[40px] text-pointBlue 
                ${isOpen ? 'max-h-[100%]' : 'max-h-[0] invisible'}`}
            >
              <VscCircleFilled className="inline-block" />
              <div className="inline-block">&nbsp;{item.name}</div>
            </Link>
          );
        }
        if (item.id >= 1000) {
          return (
            <div
              className={`flex items-center pl-[50px] mt-[10px] h-[40px] font-light ${
                isOpen ? 'max-h-[100%]' : 'max-h-[0] invisible'
              }`}
            >
              {item.name}
            </div>
          );
        }
        return (
          <Link
            to="#!"
            className={`flex items-center pl-[50px] h-[40px] text-white ${
              isOpen ? 'max-h-[100%]' : 'max-h-[0] invisible'
            }`}
            onClick={() => setCurrentSubcategory(item.id)}
          >
            <VscCircleFilled className="inline-block" />
            <div className="inline-block">&nbsp;{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarContents;
