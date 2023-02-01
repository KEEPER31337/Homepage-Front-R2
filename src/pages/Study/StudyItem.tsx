import React, { Fragment, useState } from 'react';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';
import StudyAccodion from './share/StudyAccordion';
import { StudyChip } from './share/StudyChip';

interface StudyItemType {
  id: number;
}

/**
 * TODO 나중에 다른 파일로 빼줄 예정
 * 영문 가장 앞 글자만 대문자, 나머지는 소문자로 반환해주는 함수
 * @param str
 * @returns
 */
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
/**
 * 링크 라벨에 따라 알맞은 아이콘 컴포넌트를 반환하는 함수
 * @param name 링크 라벨(github, notion, plato 등)
 * @returns 아이콘
 */
const LinkIcon = (name: string): JSX.Element => {
  if (name === 'github') return <VscGithubInverted className="h-[28px] w-[28px]" />;
  if (name === 'notion') return <SiNotion className="h-[28px] w-[28px]" />;
  return <VscLink className="h-[28px] w-[28px]" />;
};

const AccordionHeaderContent = () => {
  return (
    <div className="flex h-[64px] w-full space-x-[24px] pl-[23px] text-left">
      <span className="h-[64px] w-[64px] bg-gray-300">이미지</span>
      <div className="flex flex-col justify-between">
        <p className="h-[30px] text-[20px]">CTF 스터디</p>
        <p className="flex h-[24px] space-x-[4px] text-[16px]">
          <span>스터디장</span> <StudyChip value="김태연" /> <span>| 현재 인원 8명</span>
        </p>
      </div>
    </div>
  );
};
const AccordionBodyContent = () => {
  const link = [
    { title: 'github', contents: 'https//~' },
    { title: 'notion', contents: 'https//~' },
    { title: 'plato', contents: 'https//~' },
  ];
  const members = ['장서윤', '김은지', '송세연', '산다라박'];
  return (
    <div className="space-y-[30px]">
      <div className="space-y-[16px]">
        <p>스터디 소개</p>
        <div className="border-l-2 border-pointBlue px-[10px]">CTF 준비합니다</div>
      </div>
      <div className="space-y-[16px] ">
        <p>스터디원</p>
        <p className="flex space-x-[10px]">
          {members?.map((member: string) => (
            <StudyChip value={member} />
          ))}
        </p>
      </div>
      <div className="space-y-[16px] ">
        <p>링크</p>
        <p className="flex space-x-[16px] text-pointBlue">
          {link?.map((li) => (
            <p className="flex items-center space-x-[4px]">
              <span>{LinkIcon(li.title)}</span>
              <span className="border-b border-pointBlue">{capitalize(li.title)}</span>
            </p>
          ))}
        </p>
      </div>
    </div>
  );
};
const StudyItem = ({ id }: StudyItemType) => {
  return <StudyAccodion id={id} headerContent={AccordionHeaderContent()} bodyContent={AccordionBodyContent()} />;
};

export default StudyItem;
