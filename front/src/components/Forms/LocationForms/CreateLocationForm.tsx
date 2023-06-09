import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { LoadingButton } from "@mui/lab";
import { CreateLocationType } from "@/features/locations/types";
import {
  selectAddress,
  selectCoordinates,
  selectCreateLocationError,
  selectCreateLocationLoading
} from "@/features/locations/locationsSlice";
import LocationImagesInput from "@/components/UI/FileInput/LocationImagesInput";
import { createLocation } from "@/features/locations/locationsThunks";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateLocationForm: React.FC<Props> = ({isOpen, onClose}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentCoordinates = useAppSelector(selectCoordinates);
  const currentAddress = useAppSelector(selectAddress);
  const loading = useAppSelector(selectCreateLocationLoading);
  const error = useAppSelector(selectCreateLocationError);
  const initialState: CreateLocationType = {
    title: "",
    address: currentAddress!,
    coordinates: currentCoordinates,
    description: "",
    images: [],
    workingHours: "",
    contacts: ""
  }
  const [state, setState] = useState<CreateLocationType>(initialState);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const selectedFiles = Array.from(files || []);
    setState(prev => ({
      ...prev,
      [name]: [...(prev as any)[name], ...selectedFiles],
    }));
  };

  const deleteImage = (index: number) => {
    setState((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return {
        ...prev,
        images: updatedImages,
      };
    });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createLocation(state)).unwrap();
    setState(initialState);
    onClose();
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{fontSize: "16px"}}>
        New organization
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container>
            <Grid item>
              <LocationImagesInput onChange={fileInputHandler} onDelete={deleteImage} name="images" label="Images"/>
            </Grid>
          </Grid>
          <TextField
            label="Title"
            type="text"
            name="title"
            fullWidth
            margin="dense"
            variant="outlined"
            value={state.title}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222"
              }
            }}
          />
          <TextField
            label="Description"
            type="text"
            name="description"
            fullWidth
            margin="dense"
            variant="outlined"
            value={state.description}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222"
              }
            }}
          />
          <TextField
            label="Working hours"
            type="text"
            name="workingHours"
            fullWidth
            margin="dense"
            variant="outlined"
            value={state.workingHours}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('workingHours'))}
            helperText={getFieldError('workingHours')}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222"
              }
            }}
          />
          <TextField
            label="Contacts"
            type="text"
            name="contacts"
            fullWidth
            margin="dense"
            variant="outlined"
            value={state.contacts}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('contacts'))}
            helperText={getFieldError('contacts')}
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
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLocationForm;