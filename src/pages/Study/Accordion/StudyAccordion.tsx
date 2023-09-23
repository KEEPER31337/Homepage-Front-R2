import React, { Dispatch, SetStateAction } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { VscChevronDown } from 'react-icons/vsc';

import { StudyInfo } from '@api/dto';
import StudyAccordionBody from './StudyAccordionBody';
import StudyAccordionHeader from './StudyAccordionHeader';
import { ModalInfo } from '../Study.interface';

interface StudyAccordionProps {
  study: StudyInfo;
  setModalInfo: Dispatch<SetStateAction<ModalInfo>>;
}

const StudyAccordion = ({ study, setModalInfo }: StudyAccordionProps) => {
  return (
    <Accordion className="!shadow-none">
      <AccordionSummary
        className="!h-20 !border-b !border-white/[20%] !bg-subBlack !px-4 !text-white hover:!bg-subGray hover:!text-white focus:!outline-0"
        expandIcon={<VscChevronDown />}
      >
        <StudyAccordionHeader study={study} setModalInfo={setModalInfo} />
      </AccordionSummary>
      <AccordionDetails className="!space-y-[30px] !bg-middleBlack !px-[41px] !py-[30px] !text-white">
        <StudyAccordionBody studyId={study.studyId} />
      </AccordionDetails>
    </Accordion>
  );
};

export default StudyAccordion;
