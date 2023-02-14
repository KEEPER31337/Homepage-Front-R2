import React, { Fragment } from 'react';
import PageTitle from '@components/Typography/PageTitle';
import StudySelect from './share/StudySelect';
import StudyModal from './StudyModal';
import StudyItem from './StudyItem';

const Study = () => {
  const studyList = [1, 2, 3, 4, 5];
  const yearList = ['2022', '2021', '2020', '2019'];
  const seasonList = ['1학기', '여름방학', '2학기', '겨울방학'];
  return (
    <div className="flex w-full justify-center">
      <div className="h-full w-full max-w-[1080px] border pt-[80px]">
        <PageTitle>스터디</PageTitle>
        <div className="flex justify-center">
          <div className="h-full w-full max-w-[640px] space-y-[16px]">
            <div className="flex h-[45px] items-center justify-between">
              <div className="flex space-x-[8px]">
                <StudySelect value="2022" options={yearList} />
                <StudySelect value="1학기" options={seasonList} />
              </div>
              <StudyModal isModify={false} studyId={undefined} />
            </div>
            <div className="">
              {studyList?.map((study) => (
                <Fragment key={study}>
                  <StudyItem id={study} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
