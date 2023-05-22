import React, { useState } from "react";
import Head from "next/head";
import '@fontsource/oswald';
import { Grid, Box, TextField, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { register } from "@/features/users/usersThunks";
import { RegisterMutation } from "@/features/users/types";
import { selectRegisterError, selectRegisterLoading } from "@/features/users/usersSlice";


const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const [state, setState] = useState<RegisterMutation>({
    email: "",
    password: "",
    confirmedPassword: ""
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({...prevState, [name]: value}));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register(state)).unwrap();
    await router.push('/');
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Head>
        <title>City Scope: Sign Up</title>
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
          <Box component="form" sx={{width: '50%'}} onSubmit={submitForm}>
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
              name="email"
              value={state.email}
              onChange={inputChangeHandler}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={state.password}
              onChange={inputChangeHandler}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Confirm password"
              type="password"
              name="confirmedPassword"
              value={state.confirmedPassword}
              onChange={inputChangeHandler}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <LoadingButton
              loading={loading}
              disabled={loading}
              variant="contained"
              color="primary"
              type="submit"
              sx={{width: '50%', display: 'block', margin: '10px auto', backgroundColor: "#333333"}}
            >
              Sign Up
            </LoadingButton>
          </Box>
          <Box>
            <Link href="/register">
              Already have an account, sign in
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
