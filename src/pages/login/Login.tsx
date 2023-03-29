import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@material-tailwind/react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';

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
  const [form, setForm] = useState({
    id: '',
    password: '',
  });
  const { id, password } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      id: data.get('id'),
      password: data.get('password'),
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [validId, setValidId] = useState<boolean>(false);
  const validateId = () => {
    setValidId(/[^ㄱ-ㅎ가-힣a-zA-Z]/g.test(id));
  };

  return (
    <ThemeProvider>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo className="mb-4 h-20" />

          <Stack component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} width="100%">
            <TextField
              sx={{ mb: 2 }}
              variant="filled"
              label="아이디"
              required
              fullWidth
              placeholder="ID"
              error={validId}
              helperText={validId ? '아이디를 입력해주세요' : ''}
              name="id"
              value={id}
              onChange={onChange}
              onBlur={validateId}
            />
            <TextField
              sx={{ mb: 2 }}
              variant="filled"
              label="비밀번호"
              required
              fullWidth
              placeholder="PW"
              name="password"
              value={password}
              onChange={onChange}
            />
            <Button variant="outlined" sx={{ height: 56 }}>
              로그인
            </Button>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="로그인 상태 유지" />
          </Stack>
          <HorizonLine />
          <Stack direction="row" spacing={2}>
            <p>아이디·비밀번호 찾기</p>
            <p>|</p>
            <p>회원가입</p>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
