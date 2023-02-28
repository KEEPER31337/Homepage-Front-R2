import React, { Fragment, useState } from 'react';

import { studyList, yearList } from '@mocks/StudyApi';
import PageTitle from '@components/Typography/PageTitle';
import StudySelect from './share/StudySelect';
import StudyModal from './StudyModal';
import StudyItem from './StudyItem';
import OldStudy from './OldStudy';

const Study = () => {
  const seasonList = ['1학기', '여름방학', '2학기', '겨울방학'];
  const [currentYear, setCurrentYear] = useState('2022');
  const [currentSeason, setCurrentSeason] = useState('1학기');

  return (
    <div className="flex w-full justify-center">
      <div className="h-full w-full max-w-[1080px] border pt-[80px]">
        <PageTitle>스터디</PageTitle>

        <div className="h-full w-full space-y-[32px]">
          <div className="flex h-[45px] items-center justify-between">
            <div className="flex space-x-[8px]">
              <StudySelect value="2022" options={yearList} setValue={setCurrentYear} />
              <StudySelect value="1학기" options={seasonList} setValue={setCurrentSeason} />
            </div>
            {currentYear !== '2021' ? <StudyModal isModify={false} studyId={undefined} /> : ''}
          </div>
          {currentYear !== '2021' ? (
            <OldStudy studyList={studyList} />
          ) : (
            <div className="">
              {studyList?.map((study) => (
                <Fragment key={study}>
                  <StudyItem id={study} />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;
