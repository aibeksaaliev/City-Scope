import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, {Map, LatLngExpression} from 'leaflet';

const LeafletMap = () => {
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    // Создайте карту и добавьте ее к элементу-контейнеру с помощью useRef
    mapRef.current = L.map('map').setView([42.8746, 74.5698], 13);

    // Добавьте базовый слой карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(mapRef.current);

    // Важно очистить карту при размонтировании компонента
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  const position: LatLngExpression = [42.8746, 74.5698];

  return (
    <div id="map" style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;


