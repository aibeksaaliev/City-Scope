import React, { useEffect } from "react";
import LocationsList from "@/components/Layouts/LocationsList";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/users/usersSlice";

const Index = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <LocationsList locations={user?.locations!}/>
    </>
  );
};

export default Index;