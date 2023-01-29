import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoriesAll } from './category';
import SidebarContents from './component/SidebarContents';
import { SidebarCategoryState } from '../../../atoms';

interface sub {
  id: number | null;
  name: string;
  href: string;
  auth: any;
  external?: any;
}

interface thiscategory {
  id: number;
  name: string;
  subs: sub[];
}

interface sidebarprops {
  depth: number;
}

const Sidebar = ({ depth }: sidebarprops) => {
  const [categories, setCategories] = useState<thiscategory[]>([]);
  const [currentCategory, setCurrentCategory] = useRecoilState(SidebarCategoryState(0));
  const [collapsed, setCollapsed] = useState(Array(7).fill(false));

  useEffect(() => {
    setCategories(categoriesAll);
  }, []);

  const toggleCollapes = (i: number) => {
    const toggled = [...collapsed];
    toggled[i] = !collapsed[i];
    setCollapsed(toggled);
  };

  return (
    <div className="bg-mainBlack w-80 h-screen">
      <div className="flex flex-col pt-[35px]">
        {categories.map((category, index) => (
          <>
            <button
              type="button"
              className={`flex items-center text-white pl-[50px] w-full h-[45px] ${
                currentCategory === category.id ? 'bg-[#4ceef9]/30' : 'hover:bg-pointBlue/30'
              }`}
              onClick={() => {
                setCurrentCategory(category.id);
                toggleCollapes(index);
              }}
            >
              {category?.name}
            </button>
            <SidebarContents key={category.id} category={category} isOpen={collapsed[index]} />
          </>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
