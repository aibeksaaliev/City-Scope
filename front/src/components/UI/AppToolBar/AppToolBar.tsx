import React from "react";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import "@fontsource/oswald";
import AnonymousMenu from "@/components/UI/AppToolBar/AnonymousMenu";
import UsersMenu from "@/components/UI/AppToolBar/UsersMenu";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/users/usersSlice";

const AppToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor: "#333333"}}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                  fontFamily: 'Oswald, sans-serif',
                  textTransform: "uppercase",
                }}
              >
                City Scope
              </Typography>
            </Grid>
            {user ? <UsersMenu/> : <AnonymousMenu/>}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;