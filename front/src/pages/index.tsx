import dynamic from "next/dynamic";
import AppToolBar from "@/components/UI/AppToolBar/AppToolBar";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <LeafletMap />
      <AppToolBar/>
    </>
  );
}
