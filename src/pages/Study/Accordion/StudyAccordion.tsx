import React from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';
import { VscChevronDown } from 'react-icons/vsc';

import useCheckAuth from '@hooks/useCheckAuth';
import useModal from '@hooks/useModal';
import ActionButton from '@components/Button/ActionButton';
import StudyAccordionBody from './StudyAccordionBody';
import StudyAccordionHeader from './StudyAccordionHeader';
import StudyDeleteModal from '../Modal/StudyDeleteModal';
import type { StudyInfo } from '@api/dto';

interface StudyAccordionProps {
  study: StudyInfo;
  onEdit: () => void;
}

const StudyAccordion = ({ study, onEdit }: StudyAccordionProps) => {
  const { checkIsMyId } = useCheckAuth();
  const studyDeleteModal = useModal();

  const handleStudyEditButtonClick = () => {
    onEdit();
  };

  const handleStudyDeleteButtonClick = () => {
    studyDeleteModal.open();
  };

  return (
    <Accordion TransitionProps={{ mountOnEnter: true }} className="!shadow-none">
      <AccordionSummary
        className="!border-b !border-white/[20%] !bg-subBlack !px-4 !text-white hover:!bg-subGray hover:!text-white focus:!outline-0"
        expandIcon={<VscChevronDown />}
      >
        <StudyAccordionHeader study={study} />
      </AccordionSummary>
      <AccordionDetails className="!space-y-[30px] !bg-middleBlack !px-[41px] !py-[30px] !text-white">
        <StudyAccordionBody studyId={study.studyId} />
      </AccordionDetails>
      {checkIsMyId(study.headId) && (
        <AccordionActions className="border-t border-subBlack !bg-middleBlack">
          <ActionButton mode="edit" small onClick={handleStudyEditButtonClick}>
            수정
          </ActionButton>
          <ActionButton mode="delete" small onClick={handleStudyDeleteButtonClick}>
            삭제
          </ActionButton>
        </AccordionActions>
      )}
      {studyDeleteModal.isMounted && (
        <StudyDeleteModal
          key={studyDeleteModal.key}
          study={study}
          open={studyDeleteModal.isOpen}
          onClose={studyDeleteModal.close}
        />
      )}
    </Accordion>
  );
};

export default StudyAccordion;
