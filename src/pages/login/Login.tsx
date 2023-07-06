import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button, Box, CssBaseline, Container, Stack } from '@mui/material';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import BackgroundInput from '@components/Input/BackgroundInput';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@api/logInApi';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append('id', id);
    data.append('password', password);
  };

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

  const validation = () => {
    const isError = false;

    return !isError;
  };

  const handleClickLogin = async () => {
    if (validation()) {
      const response = await login({ loginId: id, password });
      if (response) {
        const navigate = useNavigate();
        navigate('/');
      }
    }
  };

  return (
    <CssBaseline>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo className="mb-5 h-20" />

          <Stack component="form" onSubmit={handleSubmit} width="100%">
            <BackgroundInput
              label="아이디"
              required
              fullWidth
              placeholder="ID"
              name="id"
              value={id}
              onChange={handleChange}
            />
            <BackgroundInput
              label="비밀번호"
              required
              fullWidth
              placeholder="PW"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <Button variant="outlined" sx={{ height: 56, mt: 2 }} onClick={handleClickLogin}>
              로그인
            </Button>
            <FormControlLabel
              control={<Checkbox checked={isKeepLogin} color="primary" onChange={handleCheckboxChange} />}
              label="로그인 상태 유지"
            />
          </Stack>
          <HorizonLine />
          <Stack direction="row" spacing={2}>
            <Link to="/">
              <p className="hover:underline hover:duration-300">아이디·비밀번호 찾기</p>
            </Link>
            <p>|</p>
            <Link to="/signUp">
              <p className="hover:underline hover:duration-300">회원가입</p>
            </Link>
          </Stack>
        </Box>
      </Container>
    </CssBaseline>
  );
};

export default Login;
