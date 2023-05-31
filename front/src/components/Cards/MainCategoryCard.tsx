import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { CategoryType } from "@/features/categories/types";
import { apiURL } from "@/configs/constants";

interface Props {
  mainCategory: CategoryType;
  onClick?: () => void;
}
const MainCategoryCard: React.FC<Props> = ({mainCategory, onClick}) => {
  return (
    <Grid item xs sx={{display: "flex", flexDirection: "column", alignItems: "center"}} onClick={onClick}>
      <Avatar src={apiURL + mainCategory.image} sx={{width: 56, height: 56, p: 2, backgroundColor: "#333333"}}/>
      <Typography sx={{fontSize: "11px", mt: 1}}>{mainCategory.title}</Typography>
    </Grid>
  );
};

export default MainCategoryCard;