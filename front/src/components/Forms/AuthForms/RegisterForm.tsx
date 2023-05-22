import React, { useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useRouter } from "next/router";
import { selectRegisterError, selectRegisterLoading } from "@/features/users/usersSlice";
import { RegisterMutation } from "@/features/users/types";
import { register } from "@/features/users/usersThunks";
import Link from "next/link";

const RegisterForm = () => {
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

  const getFieldError = (fieldName: string) => {
    try {
      return error?.[fieldName].valueOf();
    } catch {
      return undefined;
    }
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
        value={state.email}
        onChange={inputChangeHandler}
        fullWidth
        margin="normal"
        variant="outlined"
        error={Boolean(getFieldError('email'))}
        helperText={getFieldError('email')}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        required
        value={state.password}
        onChange={inputChangeHandler}
        fullWidth
        margin="normal"
        variant="outlined"
        error={Boolean(getFieldError('password'))}
        helperText={getFieldError('password')}
      />
      <TextField
        label="Confirm password"
        type="password"
        name="confirmedPassword"
        required
        value={state.confirmedPassword}
        onChange={inputChangeHandler}
        fullWidth
        margin="normal"
        variant="outlined"
        error={Boolean(getFieldError('confirmedPassword'))}
        helperText={getFieldError('confirmedPassword')}
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
      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <Link href="/auth/login" style={{color: "blue"}} passHref>
          Sign in
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;