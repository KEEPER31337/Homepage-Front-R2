import React, { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import { categoriesAll, categoriesHidden } from './category';
import SidebarContents from './Component/SidebarContents';

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    setCategories(categoriesAll);
  }, []);
  return (
    <Popover>
      <div className="bg-[#131316] w-80 h-screen">
        <Popover.Group as="nav" className="hidden md:flex space-x-3 lg:space-x-5">
          <SidebarContents category={categories[0]} />
          {/* {categories.map((category) => (
            <SidebarContents category={category} />
          ))} */}
        </Popover.Group>
      </div>
    </Popover>
  );
};
export default Sidebar;
