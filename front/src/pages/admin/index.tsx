import React from "react";
import Head from "next/head";
import AppToolBar from "@/components/UI/AppToolBar/AppToolBar";
import LeafletMap from "@/components/LeafletMap/LeafletMap";
import AdminSideMenuLayout from "@/components/Layouts/AdminSideMenuLayout";

const Index = () => {
  return (
    <>
      <Head>
        <title>City Scope: Admin Panel</title>
      </Head>
      <AdminSideMenuLayout/>
    </>
  );
};

export default Index;