import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { LoadingButton } from "@mui/lab";
import { createMainCategory, createSubCategory, fetchMainCategories } from "@/features/categories/categoriesThunks";
import { SubCategoryMutation } from "@/features/categories/types";
import {
  selectCategories,
  selectCreateCategoryError,
  selectCreateCategoryLoading,
} from "@/features/categories/categoriesSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCategoriesForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const mainCategories = useAppSelector(selectCategories);
  const createLoading = useAppSelector(selectCreateCategoryLoading);
  const createError = useAppSelector(selectCreateCategoryError);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState<SubCategoryMutation>({
    mainCategory: "",
    subCategoryTitle: "",
  });

  const mainCategoryInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const subCategoryInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubCategory((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitMainCategoryForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createMainCategory(category)).unwrap();
    await dispatch(fetchMainCategories());
    onClose();
  };

  const submitSubCategoryForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createSubCategory(subCategory)).unwrap();
    onClose();
  };

  const getFieldError = (fieldName: string) => {
    try {
      return createError?.[fieldName].valueOf();
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    dispatch(fetchMainCategories());
  }, [dispatch]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ fontSize: "16px" }}>New categories</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={submitMainCategoryForm}>
          <TextField
            label="Main Category Title"
            type="text"
            name="title"
            fullWidth
            margin="dense"
            variant="outlined"
            value={category}
            onChange={mainCategoryInputChangeHandler}
            error={Boolean(getFieldError("title"))}
            helperText={getFieldError("title")}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222",
              }
            }}
          />
          <LoadingButton
            loading={createLoading}
            disabled={createLoading}
            variant="contained"
            color="primary"
            type="submit"
            sx={{ backgroundColor: "#FFFFFF", color: "#333333" }}
          >
            Create
          </LoadingButton>
        </form>
        <form onSubmit={submitSubCategoryForm}>
          <TextField
            select
            fullWidth
            value={subCategory.mainCategory}
            name="mainCategory"
            label="Main Category"
            onChange={subCategoryInputChangeHandler}
          >
            <MenuItem value="" disabled>Select main category</MenuItem>
            {mainCategories.map((mainCategory) => {
              return (
                <MenuItem key={mainCategory.id} value={mainCategory.id}>
                  {mainCategory.title}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Sub Category Title"
            type="text"
            name="subCategoryTitle"
            fullWidth
            margin="dense"
            variant="outlined"
            value={subCategory.subCategoryTitle}
            onChange={subCategoryInputChangeHandler}
            error={Boolean(getFieldError("subCategoryTitle"))}
            helperText={getFieldError("subCategoryTitle")}
            inputProps={{
              style: {
                fontSize: "15px",
                padding: "11px 16px",
                color: "#222222",
              },
            }}
          />
          <LoadingButton
            loading={createLoading}
            disabled={createLoading}
            variant="contained"
            color="primary"
            type="submit"
            sx={{ backgroundColor: "#FFFFFF", color: "#333333" }}
          >
            Create
          </LoadingButton>
        </form>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#333333", px: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#FFFFFF", color: "#333333" }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategoriesForm;
