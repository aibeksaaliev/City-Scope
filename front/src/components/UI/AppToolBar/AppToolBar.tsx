import React from 'react';
import '@fontsource/oswald';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import AnonymousMenu from '@/components/UI/AppToolBar/AnonymousMenu';
import UsersMenu from '@/components/UI/AppToolBar/UsersMenu';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import Link from "next/link";

const AppToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#333333', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
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
                  textTransform: 'uppercase',
                }}
              >
                <Link href="/">City Scope</Link>
              </Typography>
            </Grid>
            {user ? <UsersMenu /> : <AnonymousMenu />}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;
