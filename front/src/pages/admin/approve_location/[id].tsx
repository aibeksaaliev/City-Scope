import React from "react";
import LocationFullCard from "@/components/Cards/LocationFullCard";
import { useRouter } from "next/router";
import isAdmin from "@/components/Layouts/IsAdmin";
import ApproveLocationCard from "@/components/Cards/ApproveLocationCard";

const ApproveLocation = () => {
  const router = useRouter();
  const id = Number(router.query);

  return (
    <>
      <ApproveLocationCard id={id}/>
    </>
  );
};

export default isAdmin(ApproveLocation);