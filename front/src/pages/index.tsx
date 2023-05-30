import dynamic from "next/dynamic";
import AppToolBar from "@/components/UI/AppToolBar/AppToolBar";
import Head from "next/head";
import React from "react";
import SideMenuLayout from "@/components/Layouts/SideMenuLayout";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>City Scope: Find Location In Your City</title>
        <meta name="description" content="City Scope: Find Location In Your City" />
      </Head>
      {/*<LeafletMap />*/}
      {/*<AppToolBar/>*/}
      <SideMenuLayout/>
    </>
  );
}
