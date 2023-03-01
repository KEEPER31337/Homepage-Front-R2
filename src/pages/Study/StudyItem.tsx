import React from 'react';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';
import { Typography } from '@material-tailwind/react';
import StudyAccordion from './share/StudyAccordion';
import { StudyChip } from './share/StudyChip';

interface StudyItemProps {
  id: number;
}
interface IconType {
  [key: string]: JSX.Element;
}

const LinkIconData: IconType = {
  github: <VscGithubInverted className="h-[28px] w-[28px]" />,
  notion: <SiNotion className="h-[28px] w-[28px]" />,
  etc: <VscLink className="h-[28px] w-[28px]" />,
};

const AccordionHeaderContent = () => {
  return (
    <div className="flex h-[64px] w-full space-x-[24px] pl-[23px] text-left">
      <span className="h-[64px] w-[64px] bg-gray-300">이미지</span>
      <div className="flex flex-col justify-between">
        <Typography className="h-[30px] text-[20px]">CTF 스터디</Typography>
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
      <div className="space-y-4">
        <Typography className="font-semibold">스터디 소개</Typography>
        <Typography className="border-l-2 border-pointBlue px-[10px]">CTF 준비합니다</Typography>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">스터디원</Typography>
        <p className="flex space-x-[10px]">
          {members?.map((member: string) => (
            <StudyChip key={member} value={member} />
          ))}
        </p>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">링크</Typography>
        <p className="flex space-x-4 text-pointBlue">
          {link?.map((li) => (
            <p key={li.title} className="flex items-center space-x-1">
              <span>{LinkIconData[li.title] ? LinkIconData[li.title] : LinkIconData.etc}</span>
              <span className="border-b border-pointBlue">{li.title}</span>
            </p>
          ))}
        </p>
      </div>
    </div>
  );
};
const StudyItem = ({ id }: StudyItemProps) => {
  return <StudyAccordion id={id} headerContent={AccordionHeaderContent()} bodyContent={AccordionBodyContent()} />;
};

export default StudyItem;
