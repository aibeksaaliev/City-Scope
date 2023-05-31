import React, { useEffect } from "react";
import LocationsList from "@/components/Layouts/LocationsList";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchLocationsBySubCategory } from "@/features/locations/locationsThunks";
import { selectLocationsBySubCategory } from "@/features/locations/locationsSlice";

const SubCategory = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locationsBySubCategory = useAppSelector(selectLocationsBySubCategory);

  const id = parseInt(router.query.id as string);

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationsBySubCategory(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <LocationsList locations={locationsBySubCategory}/>
    </>
  );
};

export default SubCategory;