import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider, Stack, Typography } from '@mui/material';
import useLoginMutation from '@api/logInApi';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardInput from '@components/Input/StandardInput';

const Login = () => {
  const [form, setForm] = useState({
    id: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);
  const { id, password } = form;
  const { mutate: login } = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
    setLoginError(false);
  };

  const handleLoginClick = () => {
    if (form.id && form.password) {
      login(
        { loginId: form.id, password: form.password },
        {
          onError: () => {
            setLoginError(true);
          },
        },
      );
    }
  };

  return (
    <Container maxWidth="xs" className="!flex flex-col items-center justify-center">
      <Logo className="mb-9 w-48" />
      <Stack component="form" spacing={6} onSubmit={handleLoginClick} width={{ xs: '90%', sm: '100%' }}>
        <Stack spacing={1}>
          <StandardInput
            hasBackground
            label="아이디"
            required
            fullWidth
            placeholder="ID"
            name="id"
            value={id}
            onChange={handleChange}
          />
          <StandardInput
            hasBackground
            label="비밀번호"
            required
            fullWidth
            placeholder="PW"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          {loginError && (
            <Typography variant="small" className="!mt-4 text-center text-subRed brightness-125">
              아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.
            </Typography>
          )}
        </Stack>
        <OutlinedButton onClick={handleLoginClick}>로그인</OutlinedButton>
      </Stack>
      <Divider className="!mb-8 !mt-12 w-11/12 sm:w-full" />
      <Stack direction="row" spacing={2}>
        <Link to="/searchAccount">
          <p className="text-gray-300 hover:underline hover:duration-300">아이디·비밀번호 찾기</p>
        </Link>
        <p>|</p>
        <Link to="/signUp">
          <p className="text-gray-300 hover:underline hover:duration-300">회원가입</p>
        </Link>
      </Stack>
    </Container>
  );
};

export default Login;
