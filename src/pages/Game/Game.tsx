import React, { useState } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import StandardTab from '@components/Tab/StandardTab';
import OutlinedButton from '@components/Button/OutlinedButton';
import ConfirmModal from '@components/Modal/ConfirmModal';

const Game = () => {
  const [tab, setTab] = useState(0);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const point = 29472; // TODO API 받아오기
  const todayTotalGamePoint = 1214; // TODO API 받아오기
  const gameList = [
    {
      id: 1,
      label: 'BASEBALL',
      rule: (
        <div>
          {[
            {
              title: '소개',
              contents: ['0~9 로 이루어진 네 자리 숫자를 9이닝 동안에 맞추는 게임입니다.'],
            },
            {
              title: '게임 방법',
              contents: [
                '각 칸에는 서로 다른 한자리 숫자가 입력됩니다',
                '한 이닝 당 30초의 시간이 주어지고,',
                '시간 내에 입력하지 않으면 ❌ 표시와 함께 다음 이닝으로 넘어갑니다',
                '하루에 1번의 기회가 주어집니다',
              ],
            },
            {
              title: '정답 처리',
              contents: [
                '🟢 숫자는 맞지만, 위치는 틀린 경우 - ball',
                '🟡 숫자, 위치 모두 맞춘 경우 - strike',
                '⚫️ 숫자, 위치 모두 틀린 경우',
              ],
            },
          ].map(({ title, contents }) => (
            <div key={title}>
              <p className="py-2 text-2xl text-pointBlue">{title}</p>
              {contents.map((content) => (
                <p key={content} className="py-2 text-lg">
                  {content}
                </p>
              ))}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" className="mb-5">
        <StandardTab options={gameList} tab={tab} setTab={setTab} />
        <OutlinedButton
          onClick={() => {
            setIsGameModalOpen(true);
          }}
        >
          게임 규칙
        </OutlinedButton>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <>
          <Typography marginRight={0.5}>보유포인트 :</Typography>
          <Typography className="!font-semibold">{point}</Typography>
        </>
        <Divider className="bg-white" sx={{ marginX: 1, marginY: 0.5 }} orientation="vertical" flexItem />
        <>
          <Typography marginRight={0.5}>오늘 결과 :</Typography>
          <Typography className={`!font-semibold ${todayTotalGamePoint >= 0 ? 'text-pointBlue' : 'text-subRed'}`}>
            {todayTotalGamePoint}
          </Typography>
        </>
      </Stack>
      {/* TODO 게임 불러오기 */}
      <ConfirmModal
        open={isGameModalOpen}
        modalWidth="sm"
        onClose={() => {
          setIsGameModalOpen(false);
        }}
        title={`게임 규칙 - ${gameList[tab].label}`}
      >
        {gameList[tab].rule}
      </ConfirmModal>
    </Stack>
  );
};

export default Game;
