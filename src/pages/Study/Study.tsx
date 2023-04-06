import React, { useEffect, useReducer, useState } from 'react';

import { studyList, yearList } from '@mocks/StudyApi';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';
import { SelectChangeEvent } from '@mui/material';
import Selector from '@components/Selector/Selector';
import { ModalInfo } from './Study.interface';
import StudyModal from './Modal/StudyModal';
import StudyAccordion from './Accordion/StudyAccordion';
import OldStudy from './OldStudy';

const OLD_YEAR_BOUND = 2022;

const seasonList = [
  { id: 0, content: '1학기' },
  { id: 1, content: '여름방학' },
  { id: 2, content: '2학기' },
  { id: 3, content: '겨울방학' },
];

const Study = () => {
  const [currentPeriod, setCurrentPeriod] = useState({ year: 0, season: 0 });
  const [currentStudyList, setCurrentStudyList] = useState(studyList);
  const [open, toggleOpen] = useReducer((prev) => !prev, false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ mode: 'Add' });

  const myMemberId = 1120; /* TODO 추후 로그인 토큰 정보를 가져와 본인의 ID를 저장 */

  const handlePeriodChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    setCurrentPeriod({ ...currentPeriod, [name]: Number(value as string) });
  };

  const handleStudyCreateButtonClick = () => {
    toggleOpen();
    setModalInfo({ mode: 'Add' });
  };
  /* 처음 한 번만 동작하는 useEffect, 페이지 초기 값 셋팅 */
  useEffect(() => {
    setCurrentPeriod({ year: 0, season: 0 }); /* TODO 현재 연도, 분기 가져와서 초기화 */
    setCurrentStudyList(studyList); /* TODO 현재 연도/분기에 따른 스터디 리스트 불러와서 초기화 */
  }, []);

  /* 페이지 데이터(year, season)가 업데이트 될 때마다 동작하는 useEffect */
  useEffect(() => {
    setCurrentStudyList(studyList); /* TODO 현재 연도/분기에 따른 스터디 리스트 불러와서 초기화 */
  }, [currentPeriod]);

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
          <OutlinedButton onClick={handleStudyCreateButtonClick}>추가</OutlinedButton>
        )}
      </div>
      {Number(yearList[currentPeriod.year].content) < OLD_YEAR_BOUND ? (
        <OldStudy list={currentStudyList} memberId={myMemberId} toggleOpen={toggleOpen} setModalInfo={setModalInfo} />
      ) : (
        <div>
          {currentStudyList?.map((study) => (
            <StudyAccordion
              key={study.id}
              study={study}
              memberId={myMemberId}
              toggleOpen={toggleOpen}
              setModalInfo={setModalInfo}
            />
          ))}
        </div>
      )}
      <StudyModal open={open} handleOpen={toggleOpen} modalInfo={modalInfo} />
    </div>
  );
};

export default Study;
