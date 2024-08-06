import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./leafletmap.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom/client";

import PopupContent from "./PopupContent";

// Define the custom camera icon
const cameraIcon = L.icon({
  iconUrl: "/src/assets/camera-icon.png", // Path to camera icon
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which corresponds to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const LeafletMap = ({ images, polygonPoints, setSelectedImage }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 13.338414, lat: 44.507932 };
  const [zoom] = useState(14);

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
      color: "White",
      fillColor: "gray",
      fillOpacity: 0.5,
    }).addTo(map.current);

    // Fit the map view to the bounds of the polygon
    map.current.fitBounds(polygon.getBounds());

    // Define the coordinates for the markers
    const markerCoordinates = [];
    images.forEach((image) => {
      markerCoordinates.push({
        img: image,
        lat: image[0].lat,
        lng: image[0].lng,
        popup: image[0].lat + "-" + image[0].lng,
      });
    });

    console.log(markerCoordinates);

    // Create markers and add them to the map with custom icons and popups
    markerCoordinates.forEach((coord) => {
      const marker = L.marker([coord.lat, coord.lng], {
        icon: cameraIcon,
      }).addTo(map.current);

      // // Render the custom component as a string
      // const popupContent = ReactDOMServer.renderToString(
      //   <PopupContent
      //     message={coord.popup}
      //     onClick={() => {
      //       //setSelectedImage(coord.img);
      //       console.log(1);
      //     }}
      //   />
      // );

      // marker.bindPopup(popupContent);
      // Render the custom component as a string (initial static HTML)
      const popupContentString = ReactDOMServer.renderToString(
        <PopupContent message={coord.popup} />
      );
      // Create a container element for the popup content
      const popupContainer = document.createElement("div");
      popupContainer.innerHTML = popupContentString;

      // Bind the static HTML to the popup
      marker.bindPopup(popupContainer);

      // Render the interactive React component into the popup container
      // Render the interactive React component into the popup container
      marker.on("popupopen", () => {
        const root = ReactDOM.createRoot(popupContainer);
        root.render(
          <PopupContent
            message={coord.popup}
            onClick={() => {
              setSelectedImage(coord.img);
            }}
          />
        );
      });
    });
  }, [center.lng, center.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default LeafletMap;
