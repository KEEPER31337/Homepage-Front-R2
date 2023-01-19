/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';
// import { ViewGridIcon } from '@heroicons/react/outline';

const SidebarContents = (category: any) => {
  const { thiscategory } = category;
  return (
    <Popover className="relative">
      <Popover.Button>
        <span className="">{thiscategory.name}</span>
      </Popover.Button>
    </Popover>
  );
};

export default SidebarContents;
