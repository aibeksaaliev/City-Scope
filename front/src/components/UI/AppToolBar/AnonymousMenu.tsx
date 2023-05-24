import React from "react";
import Link from "next/link";
import { Button, Grid } from "@mui/material";

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Link href="/auth">
        <Button
          component="div"
          variant="contained"
          fullWidth
          sx={{backgroundColor: "#FFFFFF", color: "#333333"}}
        >
          Login
        </Button>
      </Link>
    </Grid>
  );
};

export default AnonymousMenu;