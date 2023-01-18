import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { VscAccount, VscCircleLargeFilled, VscGithubInverted } from 'react-icons/vsc';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const handleErrorImg = (e: any) => {
  // e.target.src = imgMemberCircle;
};

const HeaderIcon = () => {
  return (
    <Menu as="div" className="relative flex w-[110px] justify-between">
      <a target="_blank" rel="noopener noreferrer" href="https://keeper.or.kr/wiki/%EB%8C%80%EB%AC%B8">
        <VscCircleLargeFilled className="w-[28px] h-[28px] fill-[#4CEEF9]" onError={handleErrorImg} />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/KEEPER31337">
        <VscGithubInverted className="w-[28px] h-[28px] fill-[#4CEEF9]" onError={handleErrorImg} />
      </a>
      <Menu.Button>
        <span className="sr-only">Open user menu</span>
        <VscAccount className="w-[28px] h-[28px] fill-[#4CEEF9]" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#!"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                프로필
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#!"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                프로필 수정
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link to="/" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                로그아웃
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeaderIcon;
