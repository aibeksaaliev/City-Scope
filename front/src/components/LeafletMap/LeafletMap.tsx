import React from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import L, { LatLngExpression } from "leaflet";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getAddressByCoordinates } from "@/features/locations/locationsThunks";
import {
  selectClickedPlace,
  selectLocationsBySubCategory,
  setClickedPlace,
  setCoordinates
} from "@/features/locations/locationsSlice";
import { CoordinatesType } from "@/features/locations/types";
import LocationMarker from "@/components/LeafletMap/LocationMarker";
import { useRouter } from "next/router";

const LeafletMap = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const center: LatLngExpression = { lat: 42.8746, lng: 74.5698 };
  const selectedLocations = useAppSelector(selectLocationsBySubCategory);
  const clickedPlace = useAppSelector(selectClickedPlace);

  const handleLocationClick = async (id: number) => {
    await router.push(`/categories/sub_categories/location/${id}`)
  };

  const MapEvents = () => {
    useMapEvents({
      click: (e: L.LeafletMouseEvent) => {
        const selectedCoordinates: CoordinatesType = { lat: e.latlng.lat.toString(), lng: e.latlng.lng.toString() };
        dispatch(setCoordinates(selectedCoordinates));
        dispatch(setClickedPlace({lat: e.latlng.lat, lng: e.latlng.lng}));
        dispatch(getAddressByCoordinates({ lat: e.latlng.lat.toString(), lng: e.latlng.lng.toString() }));
        const coordinatesQueryParam = `lat=${e.latlng.lat}&lng=${e.latlng.lng}`;
        const url = `/geo?coordinates=${encodeURIComponent(coordinatesQueryParam)}`;
        router.push(url);
      }
    });

    return null;
  };

  return (
    <div id="map" style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents />

        {clickedPlace && (
          <Marker position={clickedPlace} />
        )}

        {selectedLocations ? (
          selectedLocations.map(location => {
            const coordinates: LatLngExpression = {
              lat: parseFloat(location.coordinates.lat),
              lng: parseFloat(location.coordinates.lng)
            }
            return <LocationMarker
              coordinates={coordinates}
              key={location.id}
              title={location.title}
              onClick={() => handleLocationClick(location.id)}
            />
          })
        ) : null}

      </MapContainer>
    </div>
  );
};

export default LeafletMap;


