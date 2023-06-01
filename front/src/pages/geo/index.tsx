import React, { useEffect } from "react";
import PlaceLocationsList from "@/components/Layouts/PlaceLocationsList";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectAddress, selectLocationsByAddress } from "@/features/locations/locationsSlice";
import { fetchLocationsByAddress } from "@/features/locations/locationsThunks";

const Index = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectAddress);
  const locationsByAddress = useAppSelector(selectLocationsByAddress);

  useEffect(() => {
    if (address) {
      dispatch(fetchLocationsByAddress(address));
    }
  }, [dispatch, address]);

  return (
    <>
      <PlaceLocationsList locations={locationsByAddress} />
    </>
  );
};

export default Index;