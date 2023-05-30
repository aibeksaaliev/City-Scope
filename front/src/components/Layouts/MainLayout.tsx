import React, { PropsWithChildren } from "react";
import AppToolBar from "@/components/UI/AppToolBar/AppToolBar";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const MainLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <LeafletMap />
      <AppToolBar/>
      {children}
    </>
  );
};

export default MainLayout;