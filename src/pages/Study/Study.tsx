import React, { Fragment } from 'react';
import StudySelect from './share/StudySelect';
import StudyModal from './StudyModal';
import StudyItem from './StudyItem';

const StudyContent = () => {
  const studyList = [1, 2, 3, 4, 5];
  const yearList = ['2022', '2021', '2020', '2019'];
  const seasonList = ['1학기', '여름방학', '2학기', '겨울방학'];
  return (
    <div className="flex h-full flex-col space-y-[32px] pt-[80px]">
      <p className="border border-black text-blue-300">스터디</p>
      <div className="flex justify-center">
        <div className="h-full w-full max-w-[640px] space-y-[16px] border border-red-300">
          <div className="flex h-[45px] items-center justify-between border border-black">
            <div className="flex space-x-[8px]">
              <StudySelect value="2022" options={yearList} />
              <StudySelect value="1학기" options={seasonList} />
            </div>
            <StudyModal isModify={false} studyId={null} />
          </div>
          <div className=" h-full border border-black">
            {studyList?.map((study) => (
              <Fragment key={study}>
                <StudyItem id={study} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Study = () => {
  return (
    <div className="flex min-h-[100vh] w-[100vw] bg-gray-300">
      <div className="min-h-[100vh] w-[320px] border border-black bg-white">사이드 바</div>
      <div className="flex w-full justify-center">
        <div className="h-full w-full max-w-[1080px] border border-black bg-white">
          <StudyContent />
        </div>
      </div>
    </div>
  );
};

export default Study;
