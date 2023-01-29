import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { categoryIdStateFamily, subcategoryIdStateFamily } from '../../../../atoms';
import { thiscategory, sub } from '../Sidebar';

interface SidebarContentsProps {
  category: thiscategory;
  isOpen: boolean;
}

const SidebarContents = ({ category, isOpen }: SidebarContentsProps) => {
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryIdStateFamily(0));
  const [currentSubcategory, setCurrentSubcategory] = useRecoilState(subcategoryIdStateFamily(0));

  return (
    <div className="flex flex-col bg-mainBlack text-white">
      {category.subs.map((item: sub) => {
        if (currentSubcategory === item.id && currentCategory === item.id % 10) {
          return (
            <Link
              key={item.id}
              to="#!"
              className={`flex items-center pl-[50px] h-[40px] text-pointBlue 
                ${isOpen ? 'max-h-[100%]' : 'max-h-[0] invisible'}`}
            >
              <span>&nbsp;•&nbsp;</span>
              <span className="inline-block">{item.name}</span>
            </Link>
          );
        }
        if (item.id >= 1000) {
          return (
            <div
              key={item.id}
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
            key={item.id}
            to="#!"
            className={`flex items-center pl-[50px] h-[40px] text-white ${
              isOpen ? 'max-h-[100%]' : 'max-h-[0] invisible'
            }`}
            onClick={() => setCurrentSubcategory(item.id)}
          >
            <span>&nbsp;•&nbsp;</span>
            <span className="inline-block">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarContents;
