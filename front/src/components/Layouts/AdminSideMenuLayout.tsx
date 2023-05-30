import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectAddress, selectLocation,
  selectLocations,
  selectNonApprovedLocations,
  selectSelectedLocation
} from "@/features/locations/locationsSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddressCard from "@/components/Cards/AddressCard";
import { fetchLocations, fetchNonApprovedLocations } from "@/features/locations/locationsThunks";
import LocationPreviewCard from "@/components/Cards/LocationPreviewCard";
import { Button } from "@mui/material";
import CreateCategoriesForm from "@/components/Forms/LocationForms/CreateCategoriesForm";
import SideMenuLayout from "@/components/Layouts/SideMenuLayout";
import { LocationType } from "@/features/locations/types";
import LocationFullCard from "@/components/Cards/LocationFullCard";

const AdminSideMenuLayout = ({ }) => {
  const dispatch = useAppDispatch();
  const nonApprovedLocations = useAppSelector(selectNonApprovedLocations);
  const selectedLocation = useAppSelector(selectSelectedLocation);
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

  const handleLocationClick = (location: LocationType) => {
    dispatch(selectLocation(location));
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
          return <LocationPreviewCard location={location} key={location.id} onClick={() => handleLocationClick(location)}/>
        })}
      </Box>
      {selectedLocation && (
        <LocationFullCard/>
      )}
    </Drawer>
  );
};

export default AdminSideMenuLayout;
