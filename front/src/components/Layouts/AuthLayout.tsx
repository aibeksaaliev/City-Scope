import React, { PropsWithChildren } from "react";
import { Box, Grid } from "@mui/material";
import Head from "next/head";
import "@fontsource/oswald";
import Link from "next/link";

const AuthLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Head>
        <title>City Scope: Authorization</title>
        <meta name="description" content="City Scope is an authorization page for accessing the City Scope platform. Login or register to explore and interact with various city locations and leave feedback." />
      </Head>
      <Grid item xs={4}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: '#333333',
            color: '#FFFFFF',
            fontFamily: 'Oswald, sans-serif',
            textTransform: 'uppercase'
          }}
        >
          <h1>
            <Link href="/">
              City Scope
            </Link>
          </h1>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
