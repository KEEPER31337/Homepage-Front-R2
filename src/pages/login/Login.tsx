import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Checkbox, Container, FormControlLabel, Stack } from '@mui/material';
import useLoginMutation from '@api/logInApi';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardInput from '@components/Input/StandardInput';

const HorizonLine = () => {
  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: '1px solid #56CFE1',
        opacity: '30%',
        margin: '10px 0 10px',
      }}
    />
  );
};

const Login = () => {
  const [isKeepLogin, setIsKeepLogin] = useState<boolean>(false);
  const [form, setForm] = useState({
    id: '',
    password: '',
  });
  const { id, password } = form;
  const { mutate: login } = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsKeepLogin(e.target.checked);
  };

  const handleLoginClick = () => {
    if (form.id && form.password) {
      login({ loginId: form.id, password: form.password });
    }
  };

  return (
    <Container maxWidth="xs" className="-mt-10 !flex h-screen flex-col items-center justify-center sm:mt-auto">
      <Logo className="mb-9 w-48" />
      <Stack component="form" spacing={4} onSubmit={handleLoginClick} width={{ xs: '90%', sm: '100%' }}>
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
            value={password}
            onChange={handleChange}
          />
        </Stack>
        <OutlinedButton onClick={handleLoginClick}>로그인</OutlinedButton>
        <FormControlLabel
          control={<Checkbox checked={isKeepLogin} color="primary" onChange={handleCheckboxChange} />}
          label="로그인 상태 유지"
        />
      </Stack>
      <HorizonLine />
      <Stack direction="row" spacing={2}>
        <Link to="/searchAccount">
          <p className="hover:underline hover:duration-300">아이디·비밀번호 찾기</p>
        </Link>
        <p>|</p>
        <Link to="/signUp">
          <p className="hover:underline hover:duration-300">회원가입</p>
        </Link>
      </Stack>
    </Container>
  );
};

export default Login;
