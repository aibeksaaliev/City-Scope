import React, { useRef, useState } from "react";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import InputImageCard from "@/components/Cards/InputImageCard";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (index: number) => void;
  name: string;
  label: string;
}

const LocationImagesInput: React.FC<Props> = ({ onChange, onDelete, name, label }) => {
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

  const deleteImage = (index: number) => {
    setSelectedImages((prevState) => {
      const updatedImages = [...prevState];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setFilenames((prevState) => {
      const updatedFilenames = [...prevState];
      updatedFilenames.splice(index, 1);
      return updatedFilenames;
    });
    onDelete(index);
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
      <Grid container direction="row" spacing={2} alignItems="center" sx={{width: "552px"}}>
        <Grid item xs>
          <TextField
            disabled
            label={label}
            value={filenames}
            sx={{ display: "none" }}
            onClick={activateInput}
          />
          <Grid container direction="row" alignItems="center" sx={{
            overflowX: "scroll",
            flexWrap: "nowrap",
            maxWidth: "552px",
          }}>
            {selectedImages.map((image, i) => {
              return <InputImageCard image={image} key={i} onDelete={() => deleteImage(i)}/>
            })}
          </Grid>
          <Box sx={{display: "flex", justifyContent: "center", m: 1}}>
            <IconButton onClick={activateInput}>
              <AddAPhotoIcon/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationImagesInput;