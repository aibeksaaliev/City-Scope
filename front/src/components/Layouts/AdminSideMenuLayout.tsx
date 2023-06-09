import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectNonApprovedLocations } from "@/features/locations/locationsSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { fetchNonApprovedLocations } from "@/features/locations/locationsThunks";
import LocationPreviewCard from "@/components/Cards/LocationPreviewCard";
import { Button } from "@mui/material";
import CreateCategoriesForm from "@/components/Forms/LocationForms/CreateCategoriesForm";
import { useRouter } from "next/router";

const AdminSideMenuLayout = ({ }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const nonApprovedLocations = useAppSelector(selectNonApprovedLocations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchNonApprovedLocations());
  }, [dispatch]);

  const handleCreateForm = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLocationClick = async (id: number) => {
    await router.push(`/categories/sub_categories/location/${id}`)
  };


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 350,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 350, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto', paddingTop: "64px"}}>
        <Divider />
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon/>}
          onClick={handleCreateForm}
        >
          Add categories
        </Button>
        <Divider/>
        <CreateCategoriesForm isOpen={isModalOpen} onClose={closeModal}/>
        <Divider/>
        {nonApprovedLocations.map(location => {
          return <LocationPreviewCard location={location} key={location.id} onClick={() => handleLocationClick(location.id)}/>
        })}
      </Box>
    </Drawer>
  );
};

export default AdminSideMenuLayout;
