import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectAddress, selectLocations } from "@/features/locations/locationsSlice";
import AddressCard from "@/components/Cards/AddressCard";
import { fetchLocations } from "@/features/locations/locationsThunks";
import LocationPreviewCard from "@/components/Cards/LocationPreviewCard";
import { LocationType } from "@/features/locations/types";

interface Props {
  locations: LocationType[];
}

const LocationsList: React.FC<Props> = ({locations}) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectAddress);

  useEffect(() => {
    dispatch(fetchLocations());
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
      <Box sx={{ overflow: 'auto', marginTop: "64px"}}>
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

export default LocationsList;
