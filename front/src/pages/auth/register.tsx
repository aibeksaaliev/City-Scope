import React from "react";
import Head from "next/head";
import RegisterForm from "@/components/Forms/AuthForms/RegisterForm";


const Register = () => {
  return (
    <>
      <Head>
        <title>City Scope: Sign Up</title>
        <meta name="description" content="Create a new account on City Scope." />
      </Head>
      <RegisterForm/>
    </>
  );
};

export default Register;
