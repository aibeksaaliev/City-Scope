import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useAppSelector } from "@/app/hooks";
import { selectAddress } from "@/features/locations/locationsSlice";
import AddressCard from "@/components/Cards/AddressCard";

const SideMenuLayout = ({ }) => {
  const address = useAppSelector(selectAddress);

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
      </Box>
    </Drawer>
  );
};

export default SideMenuLayout;
