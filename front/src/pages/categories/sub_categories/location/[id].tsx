import React from "react";
import { useRouter } from "next/router";
import LocationFullCard from "@/components/Cards/LocationFullCard";

const Location = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  return (
    <>
      <LocationFullCard id={id}/>
    </>
  );
};

export default Location;