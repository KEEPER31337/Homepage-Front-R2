import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { VscChevronDown } from 'react-icons/vsc';

import StudyAccordionBody from './StudyAccordionBody';
import StudyAccordionHeader from './StudyAccordionHeader';
import type { PeriodicInfo, StudyInfo } from '@api/dto';

interface StudyAccordionProps {
  study: StudyInfo;
  currentPeriod: PeriodicInfo;
}

const StudyAccordion = ({ study, currentPeriod }: StudyAccordionProps) => {
  return (
    <Accordion className="!shadow-none">
      <AccordionSummary
        className="!h-20 !border-b !border-white/[20%] !bg-subBlack !px-4 !text-white hover:!bg-subGray hover:!text-white focus:!outline-0"
        expandIcon={<VscChevronDown />}
      >
        <StudyAccordionHeader study={study} currentPeriod={currentPeriod} />
      </AccordionSummary>
      <AccordionDetails className="!space-y-[30px] !bg-middleBlack !px-[41px] !py-[30px] !text-white">
        <StudyAccordionBody studyId={study.studyId} />
      </AccordionDetails>
    </Accordion>
  );
};

export default StudyAccordion;
