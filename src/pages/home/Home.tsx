import React, { useEffect, useRef, useState } from 'react';
import { Collapse, Fab } from '@mui/material';
import { VscAdd, VscDash } from 'react-icons/vsc';
import { useRecoilValue } from 'recoil';
import memberState from '@recoil/member.recoil';
import Activity from './Activity';
import Excellence from './Excellence';
import History from './History';
import Intro from './Intro';
import Trendings from './Trendings';

const Home = () => {
  const member = useRecoilValue(memberState);

  const [isAboutExpended, setIsAboutExpended] = useState(true);

  const aboutStartRef = useRef<HTMLDivElement>(null);
  const mainStartRef = useRef<HTMLDivElement>(null);

  const handleAboutExpendClick = () => {
    if (isAboutExpended) {
      mainStartRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      aboutStartRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    setIsAboutExpended((prev) => !prev);
  };

  useEffect(() => {
    if (!member) {
      setIsAboutExpended(true);
      return;
    }
    setIsAboutExpended(false);
  }, [member]);

  return (
    <div ref={mainStartRef} className="-mt-14 w-full bg-galaxy bg-contain bg-repeat sm:-mt-header">
      <Intro />
      <Collapse ref={aboutStartRef} in={isAboutExpended}>
        <Activity />
      </Collapse>
      <Collapse in={isAboutExpended} style={{ transitionDelay: isAboutExpended ? '500ms' : '0ms' }}>
        <Excellence />
      </Collapse>
      <Collapse in={isAboutExpended} style={{ transitionDelay: isAboutExpended ? '500ms' : '0ms' }}>
        <History />
      </Collapse>
      <Trendings />
      {member && (
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          className="!fixed bottom-5 right-5"
          onClick={handleAboutExpendClick}
        >
          {isAboutExpended ? (
            <>
              <VscDash className="mr-2" />
              소개글 접기
            </>
          ) : (
            <>
              <VscAdd className="mr-2" />
              소개글 펼치기
            </>
          )}
        </Fab>
      )}
    </div>
  );
};

export default Home;
