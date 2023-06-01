import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectAddress, selectLocation, selectSelectedLocation } from "@/features/locations/locationsSlice";
import AddressCard from "@/components/Cards/AddressCard";
import { fetchLocations } from "@/features/locations/locationsThunks";
import { LocationType } from "@/features/locations/types";
import LocationFullCard from "@/components/Cards/LocationFullCard";
import LocationPreviewCard from "@/components/Cards/LocationPreviewCard";

interface Props {
  locations: LocationType[];
}

const PlaceLocationsList: React.FC<Props> = ({locations}) => {
  const dispatch = useAppDispatch();
  const selectedLocation = useAppSelector(selectSelectedLocation);
  const address = useAppSelector(selectAddress);

  const handleLocationClick = (location: LocationType) => {
    dispatch(selectLocation(location));
  };

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
            return <LocationPreviewCard key={location.id} location={location} onClick={() => handleLocationClick(location)}/>
          })
        ) : null}
      </Box>
      {selectedLocation && (
        <LocationFullCard/>
      )}
    </Drawer>
  );
};

export default PlaceLocationsList;
