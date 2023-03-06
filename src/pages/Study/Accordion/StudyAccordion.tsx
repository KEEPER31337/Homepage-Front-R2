import React, { useReducer } from 'react';
import { ThemeProvider, Accordion, AccordionHeader, AccordionBody, Typography } from '@material-tailwind/react';
import { VscChevronDown, VscChevronUp, VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';
import { Divider } from '@mui/material';
import { StudyListInfo } from '@mocks/StudyApi';
import { StudyChip } from '../share/StudyChip';

interface StudyAccordionProps {
  study: StudyListInfo;
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
            hover: 'hover:text-white hover:bg-subGray',
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

const AccordionHeaderContent = ({ study }: StudyAccordionProps) => {
  return (
    <div className="flex w-full space-x-6 pl-6 text-left">
      <span className="h-16 w-16 bg-gray-300">이미지</span>
      <div className="flex flex-col justify-between">
        <Typography className="text-h3">{study.title}</Typography>
        <div className="flex">
          <Typography className="mr-1 font-semibold">스터디장</Typography>
          <StudyChip value={study.headMember.realName} />
          <Divider className="!m-1 !border-white" orientation="vertical" flexItem />
          <Typography className="font-semibold">현재 인원 {study.memberList.length}명</Typography>
        </div>
      </div>
    </div>
  );
};

const AccordionBodyContent = ({ study }: StudyAccordionProps) => {
  interface IconType {
    [key: string]: JSX.Element;
  }
  const { memberList } = study;

  const LinkIconData: IconType = {
    github: <VscGithubInverted className="h-7 w-7" />,
    notion: <SiNotion className="h-7 w-7" />,
    etc: <VscLink className="h-7 w-7" />,
  };

  return (
    <div className="space-y-[30px]">
      <div className="space-y-4">
        <Typography className="font-semibold">스터디 소개</Typography>
        <Typography className="border-l-2 border-pointBlue px-2">{study.information}</Typography>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">스터디원</Typography>
        <div className="flex space-x-2">
          {memberList?.map((member) => (
            <StudyChip key={member.id} value={member.realName} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">링크</Typography>
        <div className="flex space-x-4 text-pointBlue">
          {study.link?.map((li) => (
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

const StudyAccordion = ({ study }: StudyAccordionProps) => {
  const [open, setOpen] = useReducer((prev) => !prev, false);

  return (
    <ThemeProvider value={theme}>
      <Accordion open={open} icon={open ? <VscChevronUp /> : <VscChevronDown />}>
        <AccordionHeader className="h-20" onClick={setOpen}>
          <AccordionHeaderContent study={study} />
        </AccordionHeader>
        <AccordionBody className="space-y-[30px] py-[30px] px-[41px]">
          <AccordionBodyContent study={study} />
        </AccordionBody>
      </Accordion>
    </ThemeProvider>
  );
};

export default StudyAccordion;
