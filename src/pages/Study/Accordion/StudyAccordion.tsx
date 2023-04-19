import React, { Dispatch, DispatchWithoutAction, SetStateAction, useReducer } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import { VscChevronDown, VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';

import { Divider } from '@mui/material';
import type { StudyListInfo } from '@api/dto';
import OutlinedButton from '@components/Button/OutlinedButton';
import { Link } from 'react-router-dom';
import { ModalInfo } from '../Study.interface';
import { StudyChip } from '../share/StudyChip';

interface StudyAccordionProps {
  study: StudyListInfo;
  memberId: number;
  toggleOpen: DispatchWithoutAction;
  setModalInfo: Dispatch<SetStateAction<ModalInfo>>;
}

type StudyAccordionHeaderProps = Pick<StudyAccordionProps, 'study'>;

const StudyAccordionHeader = ({ study }: StudyAccordionHeaderProps) => {
  return (
    <div className="flex w-full space-x-2 pl-2 text-left">
      <span className="max-w-16 min-w-16 h-16 max-h-16 w-16 bg-gray-300">이미지</span>
      <div className="flex w-full items-center justify-between space-x-2 pr-2">
        <Typography className="text-h3 font-bold">{study.title}</Typography>
        <div className="flex items-center space-x-2">
          <Typography className="font-semibold">스터디장</Typography>
          <StudyChip font="Semibold" value={study.headMember.realName} />
          <Divider className="!border-white" orientation="vertical" flexItem />
          <Typography>
            현재 인원 <span className="font-semibold">{study.memberNumber}명</span>
          </Typography>
        </div>
      </div>
    </div>
  );
};

const StudyAccordionBody = ({ study, memberId, toggleOpen, setModalInfo }: StudyAccordionProps) => {
  interface IconType {
    [key: string]: React.ReactNode;
  }

  const { information, headMember, memberList } = study;

  const LinkIconData: IconType = {
    github: <VscGithubInverted className="h-5 w-5" />,
    notion: <SiNotion className="h-5 w-5" />,
    etc: <VscLink className="h-5 w-5" />,
  };

  const handleStudyModifyButtonClick = () => {
    toggleOpen();
    setModalInfo({ mode: 'Modify', selectedStudy: study });
  };
  const handleStudyDeleteButtonClick = () => {
    // TODO 스터디 제거 API 호출 후 새로고침(기능 구현 후 console 삭제 예정)
    console.log(`${study.title}삭제`);
  };

  return (
    <div className="space-y-[30px]">
      <div className="flex justify-between">
        <div className="space-y-4">
          <Typography className="font-semibold">스터디 소개</Typography>
          <Typography className="border-l-2 border-pointBlue px-2">{information}</Typography>
        </div>
        {memberId === headMember.id && (
          <div className="space-x-2">
            <OutlinedButton onClick={handleStudyModifyButtonClick}>수정</OutlinedButton>
            <OutlinedButton onClick={handleStudyDeleteButtonClick}>삭제</OutlinedButton>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">스터디원</Typography>
        <div className="flex space-x-2">
          {memberList?.map(({ id, realName }) => (
            <StudyChip key={id} value={realName} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Typography className="font-semibold">링크</Typography>
        <div className="flex space-x-3 text-pointBlue">
          {study.link?.map(({ title, contents }) => (
            <Link to={contents} target="_blank" key={title} className="flex items-center space-x-1">
              <span>{LinkIconData[title] ? LinkIconData[title] : LinkIconData.etc}</span>
              <span className="border-b border-pointBlue">{title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudyAccordion = ({ study, memberId, toggleOpen, setModalInfo }: StudyAccordionProps) => {
  return (
    <Accordion className="!shadow-none">
      <AccordionSummary
        className="!h-20 !border-b !border-white/[20%] !bg-subBlack !px-4 !text-white hover:!bg-subGray hover:!text-white focus:!outline-0"
        expandIcon={<VscChevronDown />}
      >
        <StudyAccordionHeader study={study} />
      </AccordionSummary>
      <AccordionDetails className="!space-y-[30px] !bg-middleBlack !py-[30px] !px-[41px] !text-white">
        <StudyAccordionBody study={study} memberId={memberId} toggleOpen={toggleOpen} setModalInfo={setModalInfo} />
      </AccordionDetails>
    </Accordion>
  );
};

export default StudyAccordion;
