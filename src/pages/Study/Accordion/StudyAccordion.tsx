/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, DispatchWithoutAction, SetStateAction } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import { VscChevronDown, VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';

import type { StudyInfo } from '@api/dto';
import OutlinedButton from '@components/Button/OutlinedButton';
import { Link } from 'react-router-dom';
import { ModalInfo } from '../Study.interface';
import { StudyChip } from '../share/StudyChip';
import StudyAccordionHeader from './StudyAccordionHeader';

interface StudyAccordionProps {
  study: any;
  toggleOpen: DispatchWithoutAction;
  setModalInfo: Dispatch<SetStateAction<ModalInfo>>;
}

type StudyAccordionBodyProps = Pick<StudyAccordionProps, 'study'>;

const StudyAccordionBody = ({ study }: StudyAccordionBodyProps) => {
  interface IconType {
    [key: string]: React.ReactNode;
  }

  const { information, memberList } = study;

  const LinkIconData: IconType = {
    github: <VscGithubInverted className="h-5 w-5" />,
    notion: <SiNotion className="h-5 w-5" />,
    etc: <VscLink className="h-5 w-5" />,
  };

  return (
    <div className="space-y-[30px]">
      <div className="flex justify-between space-y-4">
        <Typography className="font-semibold">스터디 소개</Typography>
        <Typography className="border-l-2 border-pointBlue px-2">{information}</Typography>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">스터디원</Typography>
        <div className="flex space-x-2">
          {memberList?.map(({ id, realName }: any) => (
            <StudyChip key={id} value={realName} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">링크</Typography>
        <div className="flex space-x-3 text-pointBlue">
          {/* {study.link?.map(({ title, contents }) => (
            <Link to={contents} target="_blank" key={title} className="flex items-center space-x-1">
              <span>{LinkIconData[title] ? LinkIconData[title] : LinkIconData.etc}</span>
              <span className="border-b border-pointBlue">{title}</span>
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  );
};

const StudyAccordion = ({ study, toggleOpen, setModalInfo }: StudyAccordionProps) => {
  return (
    <Accordion className="!shadow-none">
      <AccordionSummary
        className="!h-20 !border-b !border-white/[20%] !bg-subBlack !px-4 !text-white hover:!bg-subGray hover:!text-white focus:!outline-0"
        expandIcon={<VscChevronDown />}
      >
        <StudyAccordionHeader study={study} toggleOpen={toggleOpen} setModalInfo={setModalInfo} />
      </AccordionSummary>
      <AccordionDetails className="!space-y-[30px] !bg-middleBlack !px-[41px] !py-[30px] !text-white">
        <StudyAccordionBody study={study} />
      </AccordionDetails>
    </Accordion>
  );
};

export default StudyAccordion;
