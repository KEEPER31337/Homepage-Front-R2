import React, { useReducer } from 'react';
import { ThemeProvider, Accordion, AccordionHeader, AccordionBody, Typography } from '@material-tailwind/react';
import { VscChevronDown, VscChevronUp, VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';
import { Divider } from '@mui/material';
import { StudyChip } from './StudyChip';

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

const AccordionHeaderContent = () => {
  return (
    <div className="flex w-full space-x-6 pl-6 text-left">
      <span className="h-16 w-16 bg-gray-300">이미지</span>
      <div className="flex flex-col justify-between">
        <Typography className="text-h3">CTF 스터디</Typography>
        <div className="flex">
          <Typography className="mr-1 font-semibold">스터디장</Typography>
          <StudyChip value="김태연" />
          <Divider className="!m-1 !border-white" orientation="vertical" flexItem />
          <Typography className="font-semibold">현재 인원 8명</Typography>
        </div>
      </div>
    </div>
  );
};

const AccordionBodyContent = () => {
  interface IconType {
    [key: string]: JSX.Element;
  }

  const LinkIconData: IconType = {
    github: <VscGithubInverted className="h-7 w-7" />,
    notion: <SiNotion className="h-7 w-7" />,
    etc: <VscLink className="h-7 w-7" />,
  };

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
        <Typography className="border-l-2 border-pointBlue px-2">CTF 준비합니다</Typography>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">스터디원</Typography>
        <div className="flex space-x-2">
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
  const [open, setOpen] = useReducer((prev) => !prev, false);

  return (
    <ThemeProvider value={theme}>
      <Accordion open={open} icon={open ? <VscChevronUp /> : <VscChevronDown />}>
        <AccordionHeader className="h-20" onClick={setOpen}>
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
