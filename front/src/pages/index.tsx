import Head from "next/head";
import React from "react";
import SideMenuLayout from "@/components/Layouts/SideMenuLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>City Scope: Find Location In Your City</title>
        <meta name="description" content="City Scope: Find Location In Your City" />
      </Head>
      <SideMenuLayout/>
    </>
  );
}
