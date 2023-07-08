import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import PageTitle from '@components/Typography/PageTitle';
import StandardInput from '@components/Input/StandardInput';

const BoardWrite = () => {
  const boardName = '자유게시판'; // TODO 게시판 이름 불러오기
  return (
    <div>
      <PageTitle>{boardName}</PageTitle>
      <div className="mb-5 flex w-full items-center">
        <Stack flexDirection="row" marginRight={4} alignItems="center">
          <Typography typography="semibold" className="!mr-2">
            제목
          </Typography>
          <StandardInput
            className="w-96"
            value=""
            onChange={() => {
              // TODO
            }}
          />
        </Stack>
        <FormGroup className="flex !flex-row">
          <FormControlLabel control={<Checkbox />} label="공지" />
          <FormControlLabel control={<Checkbox />} label="비밀글" />
        </FormGroup>
        {/* TODO 비밀글 체크 시에만 렌더링 되도록 처리 */}
        <StandardInput
          className="w-32"
          value=""
          type="password"
          placeholder="게시글 비밀번호"
          onChange={() => {
            // TODO
          }}
        />
      </div>
    </div>
  );
};

export default BoardWrite;
