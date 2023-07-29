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
            '숫자 야구는 0~9 로 이루어진 네 자리 숫자를 9이닝 동안에 맞추는 게임입니다.',
            '숫자는 맞지만 위치가 틀리면 볼 🟢',
            '숫자와 위치가 모두 맞으면 스트라이크 🟡',
            '숫자와 위치가 모두 틀리면 ⚫️ ⚫️',
            '한 이닝 당 30초의 시간이 주어지고,',
            '시간 내에 입력하지 않으면 ❌ 표시와 함께 다음 이닝으로 넘어갑니다.',
          ].map((text) => (
            <p key={text} className="mb-3">
              {text}
            </p>
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
