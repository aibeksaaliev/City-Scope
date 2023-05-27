import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { SvgIconProps } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { renderToString } from "react-dom/server";
import axios from "axios";
import { useAppDispatch } from "@/app/hooks";
import { getAddressByCoordinates } from "@/features/locations/locationsThunks";
import { setCoordinates } from "@/features/locations/locationsSlice";
import { CoordinatesType } from "@/features/locations/types";

const CustomIcon = (props: SvgIconProps) => {
  return <LocationOn {...props} />;
};


const LeafletMap = () => {
  const dispatch = useAppDispatch();
  const center: LatLngExpression = { lat: 42.8746, lng: 74.5698 };

  const getAddress = async (lat: string, lng: string) => {
    const response = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
    console.log(response.data);
    return response.data;
  }

  const MapEvents = () => {
    useMapEvents({
      click: (e: L.LeafletMouseEvent) => {
        const selectedCoordinates: CoordinatesType = {lat: e.latlng.lat.toString(), lng: e.latlng.lng.toString()};
        dispatch(setCoordinates(selectedCoordinates))
        L.marker(e.latlng, { icon: customIcon }).addTo(mapRef.current!);
        dispatch(getAddressByCoordinates({lat: e.latlng.lat.toString(), lng: e.latlng.lng.toString()}))
      },
    });

    return null;
  };

  const mapRef = useRef(null);

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: renderToString(<CustomIcon style={{width: "25px"}} color="primary" fontSize="large" />),
  });

  return (
    <div id="map" style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%' }} ref={mapRef}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {/*<Marker position={center}>*/}
        {/*  <Popup>*/}
        {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
        {/*  </Popup>*/}
        {/*</Marker>*/}
        <MapEvents/>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;


