import React, { useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useRouter } from "next/router";
import { selectLoginError, selectLoginLoading } from "@/features/users/usersSlice";
import { LoginMutation } from "@/features/users/types";
import { login } from "@/features/users/usersThunks";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const [state, setState] = useState<LoginMutation>({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({...prevState, [name]: value}));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(state)).unwrap();
    await router.push('/');
  };

  return (
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
        required
        fullWidth
        margin="normal"
        variant="outlined"
        value={state.email}
        onChange={inputChangeHandler}
        error={!!error}
        helperText={error ? "Incorrect email or password" : ""}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        fullWidth
        margin="normal"
        variant="outlined"
        value={state.password}
        onChange={inputChangeHandler}
        error={!!error}
        helperText={error ? "Incorrect email or password" : ""}
      />
      <LoadingButton
        loading={loading}
        disabled={loading}
        variant="contained"
        color="primary"
        type="submit"
        sx={{width: '50%', display: 'block', margin: '10px auto', backgroundColor: "#333333"}}
      >
        Login
      </LoadingButton>
      <Typography variant="body2" align="center">
        Dont have an account yet?{" "}
        <Link href="/auth/register" style={{color: "blue"}} passHref>
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;