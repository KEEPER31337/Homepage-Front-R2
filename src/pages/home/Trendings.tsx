import { Typography } from '@material-tailwind/react';
import React from 'react';

interface Board {
  id: number;
  title: string;
  writer: { profile: string; name: string };
  createdAt: string;
  watched: number;
  img: string;
}

const Card = ({ board }: { board: Board }) => {
  return (
    <div className="h-[350px] w-[300px] border-t-[1px] border-t-pointBlue shadow-md shadow-subGray hover:shadow-pointBlue">
      <img alt="thumbnail" className="h-1/2 w-full" src={board.img} />
      <div className="px-5">
        <Typography variant="h7" className="py-2 text-yellow-700">
          board?.categoty
        </Typography>
        <Typography variant="h5" className="mb-2">
          board.title
        </Typography>
        <div className="mt-5 flex flex-row">
          <img alt="profile" src={board.writer.profile} className="mx-3 w-10 object-cover" />
          <div className="flex flex-col">
            <Typography variant="h6">{board.writer.name}</Typography>
            <Typography variant="h7">
              {board.createdAt} . {board.watched} watch
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

const dummyBoard: Board = {
  id: 1,
  title: '[2022년도 기술문서]기술문...',
  writer: { profile: '/img/profile.png', name: '송세연' },
  createdAt: '1년전',
  watched: 58,
  img: '/img/sample.png',
};

const Trendings = () => {
  return (
    <div className="flex w-full flex-col bg-mainBlack px-20">
      <div className="my-10 flex w-full flex-col">
        <Typography variant="h3" className="mb-3 px-2">
          트렌딩
        </Typography>
        <div className="grid w-[calc(100vw-480px)] grid-flow-col justify-start gap-20 overflow-x-scroll px-2 pb-5">
          {new Array(10).fill(dummyBoard).map((board) => (
            <Card key={board.id} board={board} />
          ))}
        </div>
      </div>
      <div className="my-10 w-full">
        <Typography variant="h3" className="mb-3 px-2">
          최신글
        </Typography>
        <div className="grid w-[calc(100vw-480px)] grid-flow-col justify-start gap-20 overflow-x-scroll px-2 pb-5">
          {new Array(10).fill(dummyBoard).map((board) => (
            <Card key={board.id} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trendings;
