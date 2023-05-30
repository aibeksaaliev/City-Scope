import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <Link href="/auth/login" style={{width: "25%"}}>
        <Button
          component="div"
          variant="contained"
          fullWidth
          sx={{mb: 2, backgroundColor: "#333333", color: "#FFFFFF"}}
        >
          Login
        </Button>
      </Link>
      <Link href="/auth/register"  style={{width: "25%"}}>
        <Button
          component="div"
          variant="contained"
          fullWidth
          sx={{backgroundColor: "#333333", color: "#FFFFFF"}}
        >
          Sign up
        </Button>
      </Link>
    </>
  );
};

export default Index;