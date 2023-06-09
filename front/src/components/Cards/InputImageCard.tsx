import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
  image: File;
  onDelete: () => void;
}

const InputImageCard: React.FC<Props> = ({image, onDelete}) => {
  return (
    <Grid item sx={{
      width: "95px",
      height: "95px",
      borderRadius: "8px",
      mr: 1,
      mb: 1,
      position: "relative"
    }}>
      <img
        style={{
          width: "95px",
          height: "95px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
        src={image instanceof File ? URL.createObjectURL(image) : ""}
        alt="Test"
      />
      <IconButton sx={{
        position: "absolute",
        top: "5px",
        right: "5px",
        background: "#FF3030",
        width: "20px",
        height: "20px",
        zIndex: 100}}>
        <DeleteForeverIcon
          sx={{color: "white", width: "15px", height: "15px"}}
          onClick={onDelete}
        />
      </IconButton>
    </Grid>
  );
};

export default InputImageCard;