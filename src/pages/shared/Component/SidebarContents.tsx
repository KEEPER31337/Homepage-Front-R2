import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Popover, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { VscCircleFilled } from 'react-icons/vsc';
import SidebarState from '../../../atoms';

interface SidebarContentsProps {
  category: any;
  styles: string;
}

const SidebarContents = ({ category, styles }: SidebarContentsProps) => {
  const [currentCategory, setCurrentCategory] = useRecoilState(SidebarState(0));
  useEffect(() => {
    if (category) {
      console.log(category);
      console.log(category.name);
    }
  }, [category]);

  return (
    <Popover>
      <Popover.Button className={styles} onClick={() => setCurrentCategory(category.id)}>
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
