/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer, useState } from 'react';

import { SelectChangeEvent, Typography } from '@mui/material';
import { useGetStudyListQuery } from '@api/studyApi';
import { yearList } from '@mocks/StudyApi';
import ActionButton from '@components/Button/ActionButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import Selector from '@components/Selector/Selector';
import PageTitle from '@components/Typography/PageTitle';
import StudyAccordion from './Accordion/StudyAccordion';
import StudyModal from './Modal/StudyModal';
import OldStudy from './OldStudy';
import { ModalInfo } from './Study.interface';

const OLD_YEAR_BOUND = 2022;

const seasonList = [
  { id: 0, content: '1학기' },
  { id: 1, content: '여름방학' },
  { id: 2, content: '2학기' },
  { id: 3, content: '겨울방학' },
];

const Study = () => {
  const [currentPeriod, setCurrentPeriod] = useState({ year: 0, season: 0 });

  const [studyAccoridionOpen, toggleStudyAccoridionOpen] = useReducer((prev) => !prev, false);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ mode: 'Add' });

  const { data: studyList } = useGetStudyListQuery({ year: 2023, season: 1 });

  const handlePeriodChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    setCurrentPeriod({ ...currentPeriod, [name]: Number(value as string) });
  };

  const handleStudyCreateButtonClick = () => {
    setStudyModalOpen(true);
    setModalInfo({ mode: 'Add' });
  };

  /* 처음 한 번만 동작하는 useEffect, 페이지 초기 값 셋팅 */
  useEffect(() => {
    setCurrentPeriod({ year: 0, season: 0 }); /* TODO 현재 연도, 분기 가져와서 초기화 */
  }, []);

  return (
    <div>
      <PageTitle>스터디</PageTitle>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex space-x-2">
          <Selector
            className="w-24"
            name="year"
            options={yearList}
            value={currentPeriod.year}
            onChange={handlePeriodChange}
          />
          <Selector
            className="w-24"
            name="season"
            options={seasonList}
            value={currentPeriod.season}
            onChange={handlePeriodChange}
          />
        </div>
        {Number(yearList[currentPeriod.year].content) >= OLD_YEAR_BOUND && (
          <ActionButton mode="add" onClick={handleStudyCreateButtonClick}>
            추가
          </ActionButton>
        )}
      </div>
      {Number(yearList[currentPeriod.year].content) < OLD_YEAR_BOUND ? (
        <OldStudy list={[]} memberId={-1} toggleOpen={toggleStudyAccoridionOpen} setModalInfo={setModalInfo} />
      ) : (
        <div>
          {studyList && studyList.length > 0 ? (
            studyList.map((study) => (
              <StudyAccordion
                key={study.studyId}
                study={study}
                toggleOpen={toggleStudyAccoridionOpen}
                setModalInfo={setModalInfo}
              />
            ))
          ) : (
            <Typography marginY={15} paddingY={8} textAlign="center" className="border-y border-pointBlue/70">
              현재 등록된 스터디가 없습니다. <span className="text-pointBlue">+ 추가</span> 버튼을 클릭하여 스터디를
              추가하세요.
            </Typography>
          )}
        </div>
      )}
      <StudyModal open={studyModalOpen} setOpen={setStudyModalOpen} modalInfo={modalInfo} />
    </div>
  );
};

export default Study;
