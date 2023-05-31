import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { SubCategoryType } from "@/features/categories/types";

interface Props {
  subCategory: SubCategoryType;
  onClick?: () => void;
}

const SubCategoryCard: React.FC<Props> = ({subCategory, onClick}) => {
  return (
    <Grid item xs sx={{mb: 1}} onClick={onClick}>
      <Box sx={{border: "1px solid #333333", p: 1, borderRadius: "25px"}}>
        <Typography sx={{fontSize: "14px"}}>{subCategory.title}</Typography>
      </Box>
    </Grid>
  );
};

export default SubCategoryCard;