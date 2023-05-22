import React from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { Button } from "@mui/material";
import Link from "next/link";

const Index = () => {
  return (
    <AuthLayout>
      <Link href="/auth/login" style={{width: "25%"}}>
        <Button
          component="a"
          variant="contained"
          fullWidth
          sx={{mb: 2, backgroundColor: "#333333", color: "#FFFFFF"}}
        >
          Login
        </Button>
      </Link>
      <Link href="/auth/register"  style={{width: "25%"}}>
        <Button
          component="a"
          variant="contained"
          fullWidth
          sx={{backgroundColor: "#333333", color: "#FFFFFF"}}
        >
          Sign up
        </Button>
      </Link>
    </AuthLayout>
  );
};

export default Index;