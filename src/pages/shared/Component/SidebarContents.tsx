/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';
// import { ViewGridIcon } from '@heroicons/react/outline';

interface SidebarContentsProps {
  category: any;
}

const SidebarContents = ({ category }: SidebarContentsProps) => {
  useEffect(() => {
    if (category) {
      console.log(category);
      console.log(category.name);
    }
  }, [category]);

  return (
    <Popover className="relative hover:bg-[#4ceef9]/30 ">
      <Popover.Button>
        <div className="text-white">{category?.name}</div>
      </Popover.Button>
    </Popover>
  );
};

export default SidebarContents;
