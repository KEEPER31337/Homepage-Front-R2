import React from 'react';
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
        if (currentSubcategory === item.id) {
          return (
            <Link
              key={item.id}
              to="#!"
              className={`flex h-[40px] items-center pl-[50px] text-pointBlue 
                ${isOpen ? 'max-h-[100%]' : 'invisible max-h-[0]'}`}
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
              className={`mt-[10px] flex h-[40px] items-center pl-[50px] font-light ${
                isOpen ? 'max-h-[100%]' : 'invisible max-h-[0]'
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
            className={`flex h-[40px] items-center pl-[50px] text-white ${
              isOpen ? 'max-h-[100%]' : 'invisible max-h-[0]'
            }`}
            onClick={() => {
              setCurrentSubcategory(item.id);
              setCurrentCategory(item.id % 10);
            }}
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
