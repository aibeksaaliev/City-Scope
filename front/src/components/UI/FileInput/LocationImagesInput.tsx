import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Badge, Button, Grid, IconButton, TextField } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/users/usersSlice";
import { apiURL } from "@/configs/constants";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const LocationImagesInput: React.FC<Props> = ({ onChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0].name;
      const file = e.target.files[0];
      setFilenames(prevState => [...prevState, image]);
      setSelectedImages(prevState => [...prevState, file]);
    } else {
      setFilenames([]);
      setSelectedImages([]);
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            label={label}
            value={filenames}
            sx={{ display: "none" }}
            onClick={activateInput}
          />
          <Grid container direction="row" alignItems="center">
            {selectedImages.map((image, i) => {
              return <Grid key={i} item sx={{border: "1px solid red"}}>
                <img style={{width: "50px"}} src={image instanceof File ? URL.createObjectURL(image) : ""} alt="Test" />
              </Grid>
            })}
          </Grid>
          <Button onClick={activateInput}>
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationImagesInput;