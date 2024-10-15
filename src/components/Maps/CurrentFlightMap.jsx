import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./leafletmap.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom/client";

import PopupContent from "./PopupContent";
import icon from "/src/assets/Spotlight-Marker.png";

// Define the custom camera icon
const cameraIcon = L.icon({
  iconUrl: icon, // Path to camera icon
  //iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which corresponds to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const CurrentFlightMap = ({ images, polygonPoints }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 13.338414, lat: 44.507932 };
  const [zoom] = useState(30);

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    // Create a MapTiler Layer with satellite style
    const mtLayer = new MaptilerLayer({
      apiKey: "iBsJvpwcweMJ91GDv8rm",
      style: "satellite",
    }).addTo(map.current);

    // Define the coordinates for the polygon
    const polygonCoordinates = [];

    polygonPoints.forEach((point) => {
      polygonCoordinates.push([point.lat, point.lng]);
    });

    // Create a polygon and add it to the map
    const polygon = L.polygon(polygonCoordinates, {
      color: "#FFE500",
      fillColor: "#006633",
      fillOpacity: 0.4,
    }).addTo(map.current);

    // Fit the map view to the bounds of the polygon
    map.current.fitBounds(polygon.getBounds());

    // Define the coordinates for the markers
    const markerCoordinates = [];
    const newImages = images?.[0];
    newImages?.forEach((image) => {
      markerCoordinates.push({
        lat: image.lat,
        lng: image.lng,
        popup: image.lat + "-" + image.lng,
      });
    });

    console.log(markerCoordinates);

    // Create markers and add them to the map with custom icons and popups
    markerCoordinates.forEach((coord) => {
      const marker = L.marker([coord.lat, coord.lng], {
        icon: cameraIcon,
      }).addTo(map.current);
    });
  }, [center.lng, center.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default CurrentFlightMap;
