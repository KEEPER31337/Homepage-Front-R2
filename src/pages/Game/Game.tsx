import React, { useState } from 'react';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import StandardTab from '@components/Tab/StandardTab';
import OutlinedButton from '@components/Button/OutlinedButton';
import ConfirmModal from '@components/Modal/ConfirmModal';
import { VscCheck } from 'react-icons/vsc';

const Game = () => {
  const [tab, setTab] = useState(0);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const point = 29472; // TODO API 받아오기
  const todayTotalGamePoint = 1214; // TODO API 받아오기
  const gameList = [
    {
      id: 1,
      label: 'BASEBALL',
      rule: null /* TODO */,
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
