import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import BackgroundInput from '@components/Input/BackgroundInput';
import StandardTab from '@components/Tab/StandardTab';
import { Button, Container, Divider } from '@mui/material';
import React, { useState } from 'react';

const SearchAccount = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({
    email: '',
    verificationCode: '',
  });
  const searchList = [
    { id: 0, label: '아이디 찾기' },
    { id: 1, label: '비밀번호 찾기' },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="md" className="flex flex-col items-center">
      <div className="mt-20 items-center text-center text-center">
        <StandardTab options={searchList} tab={tab} setTab={setTab} />
      </div>
      <div className="pt-10 pb-8 text-center">
        <p>가입 시 등록한 이메일을 입력해주세요.</p>
        <p>아이디 조회를 위한 인증코드가 입력한 이메일로 발송됩니다.</p>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mx-20 flex flex-col justify-center gap-10 pt-8 pb-12">
        <div className="relative flex justify-between gap-10">
          <p className="mt-4 leading-10">이메일</p>
          <BackgroundInput
            className="w-[70%]"
            label="이메일"
            required
            name="id"
            value={form.email}
            onChange={handleChange}
          />
          <Button className="absolute top-2 right-10">인증 요청</Button>
        </div>
        <div className="flex justify-between gap-10">
          <p className="mt-4 leading-10">인증코드</p>
          <BackgroundInput
            className="w-[70%]"
            label="인증코드"
            required
            name="id"
            value={form.verificationCode}
            onChange={handleChange}
          >
            <FilledButton>인증 요청</FilledButton>
          </BackgroundInput>
        </div>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mt-10 text-center">
        <OutlinedButton>확인</OutlinedButton>
      </div>
    </Container>
  );
};

export default SearchAccount;
