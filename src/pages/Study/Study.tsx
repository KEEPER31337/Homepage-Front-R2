import React, { useReducer, useState } from 'react';

import { studyList, StudyListInfo, yearList } from '@mocks/StudyApi';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';
import StudyModal from './Modal/StudyModal';
import StudyAccordion from './Accordion/StudyAccordion';
import StudySelect from './share/StudySelect';
import OldStudy from './OldStudy';

interface StudyProps {
  list: StudyListInfo[];
}

const Study = () => {
  const seasonList = ['1학기', '여름방학', '2학기', '겨울방학'];
  const [currentYear, setCurrentYear] = useState('2022');
  const [currentSeason, setCurrentSeason] = useState('1학기');
  const [open, toggleOpen] = useReducer((prev) => !prev, false);

  return (
    <div>
      <PageTitle>스터디</PageTitle>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex space-x-2">
          <StudySelect value="2022" options={yearList} setValue={setCurrentYear} />
          <StudySelect value="1학기" options={seasonList} setValue={setCurrentSeason} />
        </div>
        {currentYear !== '2021' && <OutlinedButton onClick={toggleOpen}>추가</OutlinedButton>}
      </div>
      {currentYear !== '2021' ? (
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
