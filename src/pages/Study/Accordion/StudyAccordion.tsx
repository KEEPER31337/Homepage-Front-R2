/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, DispatchWithoutAction, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import { SiNotion } from 'react-icons/si';
import { VscChevronDown, VscGithubInverted, VscLink } from 'react-icons/vsc';

import OutlinedButton from '@components/Button/OutlinedButton';
import StudyAccordionBody from './StudyAccordionBody';
import StudyAccordionHeader from './StudyAccordionHeader';
import { ModalInfo } from '../Study.interface';
import { StudyChip } from '../share/StudyChip';
import type { StudyInfo } from '@api/dto';

interface StudyAccordionProps {
  study: any;
  toggleOpen: DispatchWithoutAction;
  setModalInfo: Dispatch<SetStateAction<ModalInfo>>;
}

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
        <StudyAccordionBody studyId={study.studyId} />
      </AccordionDetails>
    </Accordion>
  );
};

export default StudyAccordion;
