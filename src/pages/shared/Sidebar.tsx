import React, { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { categoriesAll, categoriesHidden } from './category';
import SidebarContents from './component/SidebarContents';
import { SidebarCategoryState, SidebarSubcategoryState } from '../../atoms';

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

const Sidebar = () => {
  const [categories, setCategories] = useState<thiscategory[]>([]);
  const [currentCategory, setCurrentCategory] = useRecoilState(SidebarCategoryState(0));
  useEffect(() => {
    setCategories(categoriesAll);
  }, []);

  return (
    <Popover>
      <div className="bg-[#131316] w-80 h-screen">
        <Popover.Group as="nav" className="flex flex-col pt-[35px]">
          {categories.map((category) =>
            currentCategory === category.id ? (
              <SidebarContents
                category={category}
                styles="flex items-center text-white pl-[50px] w-full h-[45px] bg-[#4ceef9]/30"
              />
            ) : (
              <SidebarContents
                category={category}
                styles="flex items-center text-white pl-[50px] w-full h-[45px] hover:bg-[#4ceef9]/30"
              />
            ),
          )}
        </Popover.Group>
      </div>
    </Popover>
  );
};
export default Sidebar;
