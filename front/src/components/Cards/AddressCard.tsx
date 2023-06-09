import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CreateLocationForm from "@/components/Forms/LocationForms/CreateLocationForm";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/users/usersSlice";
import { router } from "next/client";

interface Props {
  address: string;
}

const AddressCard: React.FC<Props> = ({address}) => {
  const user = useAppSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addOrganization = () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{m: 1, p: 1, border: "1px solid #333333", borderRadius: "5px"}}>
      <Grid container>
        <Grid item sx={{mb: 2}}>
          <Typography
            variant="h6"
            sx={{fontSize: "15px"}}
          >
            {address}
          </Typography>
        </Grid>
        <Grid item sx={{width: "100%"}}>
          <Button
            variant="contained"
            fullWidth
            sx={{backgroundColor: "#333333", color: "#FFFFFF"}}
            onClick={addOrganization}
          >
            Add organization
          </Button>
        </Grid>
      </Grid>
      <CreateLocationForm isOpen={isModalOpen} onClose={closeModal}/>
    </Box>
  );
};

export default AddressCard;