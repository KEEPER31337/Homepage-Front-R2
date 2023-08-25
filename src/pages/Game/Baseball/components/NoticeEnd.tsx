import React from 'react';

export type EndType = 'win' | 'lose';

interface NoticeEndProps {
  endType: EndType;
}

const NoticeEnd = ({ endType }: NoticeEndProps) => {
  const msg = {
    win: {
      main: 'congraturation',
      sub: 'YOU WIN!',
    },
    lose: {
      main: 'no more chance',
      sub: 'GAME OVER',
    },
  };

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-black/70 text-center active:hidden">
      <p className="text-2xl font-semibold">{msg[endType].main}</p>
      <p className="text-2xl font-semibold text-pointBlue">{msg[endType].sub}</p>
      <p className="mt-2 text-small text-gray-400">
        오늘 게임 횟수를 모두 소진하였습니다.
        <br />
        선명한 현황판을 보고 싶다면 화면을 눌러주세요.
      </p>
    </div>
  );
};

export default NoticeEnd;
