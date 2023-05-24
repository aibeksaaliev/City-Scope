import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Badge, Grid, IconButton, TextField } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/users/usersSlice";
import { apiURL } from "@/configs/constants";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const SmallIconButton = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid #FFFFFF`,
  backgroundColor: "#333333",
  '&:hover': {
    backgroundColor: "#555555",
  },
}));

const AvatarInput: React.FC<Props> = ({ onChange, name, label }) => {
  const user = useAppSelector(selectUser);
  const avatar = user ? apiURL + user.avatar : "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | string>(avatar);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
      setSelectedImage(e.target.files[0]);
    } else {
      setFilename("");
      setSelectedImage(avatar);
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
            value={filename}
            sx={{ display: "none" }}
            onClick={activateInput}
          />
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <SmallIconButton
                onClick={activateInput}
              >
                <PhotoCameraIcon sx={{color: "#FFFFFF"}}/>
              </SmallIconButton>
            }
          >
            <Avatar
              sx={{width: "100px", height: "100px"}}
              src={selectedImage instanceof File ? URL.createObjectURL(selectedImage) : avatar}
            />
          </Badge>
        </Grid>
      </Grid>
    </>
  );
};

export default AvatarInput;