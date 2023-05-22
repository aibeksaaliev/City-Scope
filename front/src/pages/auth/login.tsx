import React from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import LoginForm from "@/components/Forms/AuthForms/LoginForm";
import Head from "next/head";


const Login = () => {
  return (
    <AuthLayout>
      <Head>
        <title>City Scope: Login</title>
        <meta name="description" content="Log in to your City Scope account." />
      </Head>
      <LoginForm/>
    </AuthLayout>
  );
};

export default Login;
