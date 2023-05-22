import React from 'react';
import { Grid, Box, TextField, Button, IconButton } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import Head from "next/head";
import '@fontsource/oswald';
import Link from "next/link";


const Login = () => {
  const handleLogin = () => {
    // Обработка логики входа пользователя
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Head>
        <title>City Scope: Login</title>
        <meta name="description" content="Описание страницы" />
      </Head>
      <Grid item xs={4}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: '#333333',
            color: '#FFFFFF',
            fontFamily: 'Oswald, sans-serif',
            textTransform: 'uppercase'
          }}
        >
          <h1>City Scope</h1>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box component="form" sx={{width: '50%'}}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '0 auto',
              width: '50%'
            }}>
              <IconButton sx={{backgroundColor: '#FFFFFF'}}><GoogleIcon/></IconButton>
              <IconButton sx={{backgroundColor: '#FFFFFF'}}><FacebookIcon/></IconButton>
              <IconButton sx={{backgroundColor: '#FFFFFF'}}><AppleIcon/></IconButton>
            </Box>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{width: '50%', display: 'block', margin: '10px auto'}}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
          <Box>
            <Link href="/register">
              Sign Up
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
