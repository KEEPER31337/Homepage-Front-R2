import React, { useState } from 'react';
import { ThemeProvider, Accordion, AccordionHeader, AccordionBody, Typography } from '@material-tailwind/react';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';
import { StudyChip } from './StudyChip';

interface ArrowIconProps {
  open: boolean;
}

const theme = {
  accordion: {
    styles: {
      base: {
        container: {},
        header: {
          initial: {
            fontColor: 'text-white',
            borderColor: 'border-white/[20%]',
            focus: 'focus:outline-0',
            hover: 'hover:text-white hover:bg-gray-600',
          },
          active: {
            fontColor: 'text-white',
          },
        },
        body: {
          bgColor: 'bg-middleBlack',
          fontColor: 'text-white',
        },
      },
    },
  },
};

const Icon = ({ open }: ArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${open ? 'rotate-180' : ''} h-[20px] w-[20px] transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

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
    <div className="flex h-16 w-full space-x-6 pl-6 text-left">
      <span className="h-16 w-16 bg-gray-300">이미지</span>
      <div className="flex flex-col justify-between">
        <Typography className="h-[30px] text-[20px]">CTF 스터디</Typography>
        <div className="flex h-6 space-x-[4px] text-[16px]">
          <span>스터디장</span> <StudyChip value="김태연" /> <span>| 현재 인원 8명</span>
        </div>
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
        <div className="flex space-x-[10px]">
          {members?.map((member: string) => (
            <StudyChip key={member} value={member} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">링크</Typography>
        <div className="flex space-x-4 text-pointBlue">
          {link?.map((li) => (
            <div key={li.title} className="flex items-center space-x-1">
              <span>{LinkIconData[li.title] ? LinkIconData[li.title] : LinkIconData.etc}</span>
              <span className="border-b border-pointBlue">{li.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudyAccordion = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider value={theme}>
      <Accordion open={open} icon={<Icon open={open} />}>
        <AccordionHeader className="h-[80px]" onClick={() => handleOpen()}>
          <AccordionHeaderContent />
        </AccordionHeader>
        <AccordionBody className="space-y-[30px] py-[30px] px-[41px]">
          <AccordionBodyContent />
        </AccordionBody>
      </Accordion>
    </ThemeProvider>
  );
};

export default StudyAccordion;
