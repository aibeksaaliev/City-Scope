import React from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import Head from "next/head";
import RegisterForm from "@/components/Forms/AuthForms/RegisterForm";


const Register = () => {
  return (
    <AuthLayout>
      <Head>
        <title>City Scope: Sign Up</title>
        <meta name="description" content="Create a new account on City Scope." />
      </Head>
      <RegisterForm/>
    </AuthLayout>
  );
};

export default Register;
