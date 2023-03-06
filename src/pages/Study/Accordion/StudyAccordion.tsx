import React, { useReducer } from 'react';
import {
  ThemeProvider,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  AccordionStylesType,
} from '@material-tailwind/react';
import { VscChevronDown, VscChevronUp, VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';

import { Divider } from '@mui/material';
import { StudyListInfo } from '@mocks/StudyApi';
import OutlinedButton from '@components/Button/OutlinedButton';
import { Link } from 'react-router-dom';
import { StudyChip } from '../share/StudyChip';

interface StudyAccordionProps {
  study: StudyListInfo;
  memberId: number;
}
interface StudyAccordionHeaderProps {
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
            padding: 'px-4',
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
  } satisfies AccordionStylesType,
};

const AccordionHeaderContent = ({ study }: StudyAccordionHeaderProps) => {
  return (
    <div className="flex w-full space-x-6 pl-2 text-left">
      <span className="max-w-16 max-h-16 bg-gray-300">이미지</span>
      <div className="flex w-full items-center justify-between">
        <Typography className="text-h3 font-bold">{study.title}</Typography>
        <div className="flex items-center">
          <Typography className="mr-1 font-semibold">스터디장</Typography>
          <StudyChip value={study.headMember.realName} />
          <Divider className="!m-1 !border-white" orientation="vertical" flexItem />
          <Typography className="font-semibold">현재 인원 {study.memberNumber}명</Typography>
        </div>
      </div>
    </div>
  );
};

const AccordionBodyContent = ({ study, memberId }: StudyAccordionProps) => {
  interface IconType {
    [key: string]: JSX.Element;
  }
  const { memberList } = study;

  const LinkIconData: IconType = {
    github: <VscGithubInverted className="h-7 w-7" />,
    notion: <SiNotion className="h-7 w-7" />,
    etc: <VscLink className="h-7 w-7" />,
  };
  const handleStudyModifyButtonClick = () => {
    console.log(`${study.id}수정`);
  };
  const handleStudyDeleteButtonClick = () => {
    console.log(`${study.id}삭제`);
  };

  return (
    <div className="space-y-[30px]">
      <div className="flex justify-between">
        <div className="space-y-4">
          <Typography className="font-semibold">스터디 소개</Typography>
          <Typography className="border-l-2 border-pointBlue px-2">{study.information}</Typography>
        </div>
        {memberId === study.headMember.id ? (
          <div className="space-x-3">
            <OutlinedButton onClick={handleStudyModifyButtonClick}>수정</OutlinedButton>
            <OutlinedButton onClick={handleStudyDeleteButtonClick}>삭제</OutlinedButton>
          </div>
        ) : (
          ''
        )}
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
            <Link to={li.contents} target="_blank" key={li.title} className="flex items-center space-x-1">
              <span>{LinkIconData[li.title] ? LinkIconData[li.title] : LinkIconData.etc}</span>
              <span className="border-b border-pointBlue">{li.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudyAccordion = ({ study, memberId }: StudyAccordionProps) => {
  const [open, setOpen] = useReducer((prev) => !prev, false);

  return (
    <ThemeProvider value={theme}>
      <Accordion open={open} icon={open ? <VscChevronUp /> : <VscChevronDown />}>
        <AccordionHeader className="h-20" onClick={setOpen}>
          <AccordionHeaderContent study={study} />
        </AccordionHeader>
        <AccordionBody className="space-y-[30px] py-[30px] px-[41px]">
          <AccordionBodyContent study={study} memberId={memberId} />
        </AccordionBody>
      </Accordion>
    </ThemeProvider>
  );
};

export default StudyAccordion;
