import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { ApproveLocationType } from "@/features/locations/types";
import { fetchMainCategories, fetchSubCategories } from "@/features/categories/categoriesThunks";
import { selectCategories, selectSubCategories } from "@/features/categories/categoriesSlice";
import { approveLocation } from "@/features/locations/locationsThunks";
import { selectLocation } from "@/features/locations/locationsSlice";

interface Props {
  id: number;
}

const ApproveLocationForm: React.FC<Props> = ({id}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const subCategories = useAppSelector(selectSubCategories);
  const [category, setCategory] = useState<ApproveLocationType>({
    subCategoryId: "",
    status: true,
  });

  const categoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchSubCategories(parseInt(e.target.value)));
  };

  const subCategoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(prevState => ({...prevState, subCategoryId: e.target.value}));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(approveLocation({data: category, id})).unwrap();
    dispatch(selectLocation(null));
  };

  useEffect(() => {
    dispatch(fetchMainCategories());
  }, [dispatch]);

  return (
    <form onSubmit={submitForm}>
      <Grid container direction="column" spacing={2} sx={{mt: 2}}>
        <Grid item xs>
          <TextField
            select
            fullWidth
            name="mainCategory"
            label="Main Category"
            onChange={categoryChangeHandler}
          >
            <MenuItem value="" disabled>
              Select main category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            select
            fullWidth
            name="subCategory"
            label="Sub Category"
            onChange={subCategoryChangeHandler}
          >
            <MenuItem value="" disabled>
              Select sub category
            </MenuItem>
            {subCategories ? (
              subCategories.map((subCategory) => {
                return (
                  <MenuItem key={subCategory.id} value={subCategory.id}>
                    {subCategory.title}
                  </MenuItem>
                )
              })
            ) : null}
          </TextField>
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
          >
            Approve
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ApproveLocationForm;
