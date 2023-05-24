import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectUpdateError, selectUpdateLoading, selectUser } from "@/features/users/usersSlice";
import { ProfileEditMutation } from "@/features/users/types";
import AvatarInput from "@/components/UI/FileInput/AvatarInput";
import { LoadingButton } from "@mui/lab";
import { editProfile } from "@/features/users/usersThunks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EditModalForm: React.FC<Props> = ({isOpen, onClose}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUpdateLoading);
  const error = useAppSelector(selectUpdateError);
  const [state, setState] = useState<ProfileEditMutation>({
    firstName: user && user.firstName ? user.firstName : "",
    lastName: user && user.lastName ? user.lastName : "",
    phoneNumber: user && user.phoneNumber ? user.phoneNumber : "",
    email: user && user.email ? user.email : "",
    avatar: user && user.avatar ? user.avatar : "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prev => ({
      ...prev, [name]: files && files[0] ? files[0] : null,
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(editProfile(state)).unwrap();
    onClose();
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.[fieldName].valueOf();
    } catch {
      return undefined;
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{fontSize: "16px"}}>
        Edit Profile
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container justifyContent="center">
            <Grid item>
              <AvatarInput onChange={fileInputHandler} name={"avatar"} label={"Avatar"}/>
            </Grid>
          </Grid>
          <TextField
            label="First name"
            type="text"
            name="firstName"
            fullWidth
            margin="dense"
            variant="outlined"
            value={state.firstName}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('firstName'))}
            helperText={getFieldError('firstName')}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222"
              }
            }}
          />
          <TextField
            label="Last name"
            type="text"
            name="lastName"
            fullWidth
            margin="dense"
            variant="outlined"
            value={state.lastName}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('lastName'))}
            helperText={getFieldError('lastName')}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222"
              }
            }}
          />
          <TextField
            label="Phone number"
            type="text"
            name="phoneNumber"
            fullWidth
            margin="dense"
            variant="outlined"
            value={state.phoneNumber}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('phoneNumber'))}
            helperText={getFieldError('phoneNumber')}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222"
              }
            }}
          />
          <TextField
            label="E-mail"
            type="email"
            name="email"
            fullWidth
            margin="dense"
            variant="outlined"
            value={state.email}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('email'))}
            helperText={getFieldError('email')}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222"
              }
            }}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{backgroundColor: "#333333", px: 3}}>
        <Button
          variant="contained"
          color="primary"
          sx={{backgroundColor: "#FFFFFF", color: "#333333"}}
          onClick={onClose}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          disabled={loading}
          variant="contained"
          color="primary"
          type="submit"
          onClick={submitForm}
          sx={{backgroundColor: "#FFFFFF", color: "#333333"}}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditModalForm;