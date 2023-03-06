import React, { useEffect, useReducer, useState } from 'react';

import { studyList, yearList } from '@mocks/StudyApi';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';
import { SelectChangeEvent } from '@mui/material';
import Selector from '@components/Selector/Selector';
import StudyModal from './Modal/StudyModal';
import StudyAccordion from './Accordion/StudyAccordion';
import StudySelect from './share/StudySelect';
import OldStudy from './OldStudy';

const Study = () => {
  const seasonList = [
    { id: 0, content: '1학기' },
    { id: 1, content: '여름방학' },
    { id: 2, content: '2학기' },
    { id: 3, content: '겨울방학' },
  ];
  const [currentYear, setCurrentYear] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [open, toggleOpen] = useReducer((prev) => !prev, false);
  const [selectedStudyId, setSelectedStudyId] = useState(0);

  const handleYearChange = (event: SelectChangeEvent<unknown>) => {
    setCurrentYear(Number(event.target.value as string));
  };
  const handleSeasonChange = (event: SelectChangeEvent<unknown>) => {
    setCurrentSeason(Number(event.target.value as string));
  };
  const handleSelectedStudyIdChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedStudyId(Number(event.target.value as string));
  };

  useEffect(() => {
    setSelectedStudyId(0);
  }, []);
  return (
    <div>
      <PageTitle>스터디</PageTitle>
      <div className="mb-5 flex  items-center justify-between">
        <div className="flex space-x-2">
          <Selector className="w-24" label="" options={yearList} value={currentYear} onChange={handleYearChange} />
          <Selector
            className="w-24"
            label=""
            options={seasonList}
            value={currentSeason}
            onChange={handleSeasonChange}
          />
        </div>
        {currentYear !== 0 && <OutlinedButton onClick={toggleOpen}>추가</OutlinedButton>}
      </div>
      {currentYear !== 0 ? (
        <OldStudy list={studyList} />
      ) : (
        <div>
          {studyList?.map((study) => (
            <StudyAccordion key={study.id} study={study} />
          ))}
        </div>
      )}
      <StudyModal open={open} handleOpen={toggleOpen} isModify={false} studyId={undefined} />
    </div>
  );
};

export default Study;
