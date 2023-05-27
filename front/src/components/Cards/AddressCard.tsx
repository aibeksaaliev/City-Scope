import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CreateLocationForm from "@/components/Forms/LocationForms/CreateLocationForm";

interface Props {
  address: string;
}

const AddressCard: React.FC<Props> = ({address}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addOrganization = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{p: 1}}>
      <Grid container>
        <Grid item sx={{mb: 3}}>
          <Typography
            variant="h6"
            sx={{fontSize: "18px"}}
          >
            {address}
          </Typography>
        </Grid>
        <Grid item sx={{m: "auto"}}>
          <Button
            variant="contained"
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