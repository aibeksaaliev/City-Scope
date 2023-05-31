import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import L, { LatLngExpression } from "leaflet";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getAddressByCoordinates } from "@/features/locations/locationsThunks";
import { selectLocationsBySubCategory, setCoordinates } from "@/features/locations/locationsSlice";
import { CoordinatesType } from "@/features/locations/types";

const LeafletMap = () => {
  const dispatch = useAppDispatch();
  const center: LatLngExpression = { lat: 42.8746, lng: 74.5698 };
  const selectedLocations = useAppSelector(selectLocationsBySubCategory);
  const [clickedLocation, setClickedLocation] = useState<LatLngExpression | null>(null);

  const MapEvents = () => {
    useMapEvents({
      click: (e: L.LeafletMouseEvent) => {
        const selectedCoordinates: CoordinatesType = { lat: e.latlng.lat.toString(), lon: e.latlng.lng.toString() };
        dispatch(setCoordinates(selectedCoordinates));
        setClickedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
        dispatch(getAddressByCoordinates({ lat: e.latlng.lat.toString(), lon: e.latlng.lng.toString() }));
      }
    });

    return null;
  };

  return (
    <div id="map" style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents />

        {clickedLocation && (
          <Marker position={clickedLocation} />
        )}

        {selectedLocations ? (
          selectedLocations.map(location => {
            const coordinates: LatLngExpression = {
              lat: parseFloat(location.coordinates.lat),
              lng: parseFloat(location.coordinates.lon)
            }
            return <Marker position={coordinates} key={location.id}/>
          })
        ) : null}

      </MapContainer>
    </div>
  );
};

export default LeafletMap;


