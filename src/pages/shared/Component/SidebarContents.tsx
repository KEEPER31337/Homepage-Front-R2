/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { VscCircleFilled } from 'react-icons/vsc';
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
    <Popover>
      <Popover.Button className="flex items-center text-white pl-[50px] w-full h-[45px] hover:bg-[#4ceef9]/30 ">
        <div>{category?.name}</div>
      </Popover.Button>
      <Popover.Panel>
        <div className="flex flex-col relative bg-[#131316] text-white">
          {category.subs.map((item: any) => (
            <Link to="#!" className="flex items-center pl-[50px] h-[40px] ">
              <VscCircleFilled className="inline-block" />
              <div className="inline-block">&nbsp;{item.name}</div>
            </Link>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default SidebarContents;
