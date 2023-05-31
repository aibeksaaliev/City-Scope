import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMainCategories, fetchSubCategories } from "@/features/categories/categoriesThunks";
import { selectCategories, selectSubCategories } from "@/features/categories/categoriesSlice";
import MainCategoryCard from "@/components/Cards/MainCategoryCard";
import { Grid } from "@mui/material";
import SubCategoryCard from "@/components/Cards/SubCategoryCard";
import { fetchLocations, fetchLocationsBySubCategory } from "@/features/locations/locationsThunks";
import { useRouter } from "next/router";

const MainSideMenuLayout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const mainCategories = useAppSelector(selectCategories);
  const subCategories = useAppSelector(selectSubCategories);

  const openMainCategory = async (id: number) => {
    await dispatch(fetchSubCategories(id));
    await router.push('/categories')
  };

  const openSubCategory = async (id: number) => {
    await dispatch(fetchLocationsBySubCategory(id));
    await router.push(`/categories/sub_categories/${id}`)
  };

  useEffect(() => {
    dispatch(fetchMainCategories());
  }, [dispatch]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 350,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 350, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto', marginTop: "64px", p: 1}}>
        <Divider />
        <Grid container sx={{mt: 3, mb: 2}}>
          {mainCategories.map(category => {
            return <MainCategoryCard
              mainCategory={category}
              key={category.id}
              onClick={() => openMainCategory(category.id)}
            />
          })}
        </Grid>
        <Divider />
        <Grid container sx={{mt: 2, mb: 2}} flexDirection="column">
          {subCategories ? (
            subCategories.map(category => {
              return <SubCategoryCard
                subCategory={category}
                key={category.id}
                onClick={() => openSubCategory(category.id)}/>
            })
          ) : null}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default MainSideMenuLayout;
