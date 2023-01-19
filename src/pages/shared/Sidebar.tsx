import React, { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import { categoriesAll, categoriesHidden } from './category';
import SidebarContents from './Component/SidebarContents';

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

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<thiscategory[]>([]);
  useEffect(() => {
    setCategories(categoriesAll);
  }, []);

  return (
    <Popover>
      <div className="bg-[#131316] w-80 h-screen">
        <Popover.Group as="nav" className="flex flex-col">
          {categories.map((category) => (
            <SidebarContents category={category} />
          ))}
        </Popover.Group>
      </div>
    </Popover>
  );
};
export default Sidebar;
