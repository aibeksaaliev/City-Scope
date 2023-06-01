import React from "react";
import { Box } from "@mui/material";
import { Marker, Popup } from "react-leaflet";
import { MarkerCoordinatesType } from "@/features/locations/types";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.js";

interface Props {
  coordinates: MarkerCoordinatesType;
  title: string;
  onClick: () => void;
}

const LocationMarker: React.FC<Props> = ({ coordinates, title, onClick }) => {

  return (
    <Box>
      <Marker position={coordinates} eventHandlers={{ click: onClick}}>
        <Popup>
          {title}
        </Popup>
      </Marker>
    </Box>
  );
};

export default LocationMarker;