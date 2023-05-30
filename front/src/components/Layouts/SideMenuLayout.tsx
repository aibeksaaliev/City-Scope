import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectAddress, selectLocations } from "@/features/locations/locationsSlice";
import AddressCard from "@/components/Cards/AddressCard";
import { fetchLocations } from "@/features/locations/locationsThunks";
import LocationPreviewCard from "@/components/Cards/LocationPreviewCard";

const SideMenuLayout = ({ }) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectAddress);
  const locations = useAppSelector(selectLocations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  console.log(locations);

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
        {address ? <AddressCard address={address}/> : null}
        <Divider />
        {locations ? (
          locations.map(location => {
            return <LocationPreviewCard key={location.id} location={location}/>
          })
        ) : null}
      </Box>
    </Drawer>
  );
};

export default SideMenuLayout;
