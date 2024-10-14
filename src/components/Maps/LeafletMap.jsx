import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./leafletmap.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom/client";
import PopupContent from "./PopupContent";
import getRandImageGroup from "@/utils/getRandImageGroup";

const cameraIcon = L.icon({
  iconUrl: "/src/assets/Spotlight-Marker.png",
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const selectedImageCameraIcon = L.icon({
  iconUrl: "/src/assets/Spotlight-Marker-selected.png",
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const LeafletMap = ({
  images,
  polygonPoints,
  selectedImage,
  setSelectedImage,
  randImage,
  setRandImage,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]); // Store markers to be able to remove them
  const center = { lng: 13.338414, lat: 44.507932 };
  const [zoom] = useState(14);

  // Initialize the map on first render
  useEffect(() => {
    if (map.current) return; // Avoid reinitializing the map

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    const mtLayer = new MaptilerLayer({
      apiKey: "iBsJvpwcweMJ91GDv8rm",
      style: "satellite",
    }).addTo(map.current);

    const polygonCoordinates = polygonPoints.map((point) => [
      point.lat,
      point.lng,
    ]);

    const polygonStyle = {
      color: "#FFE500",
      fillColor: "#006633",
      fillOpacity: 0.4,
    };

    const polygon = L.polygon(polygonCoordinates, polygonStyle).addTo(
      map.current
    );
    map.current.fitBounds(polygon.getBounds());
  }, [center.lng, center.lat, zoom, polygonPoints]);

  // Handle markers and selected image changes
  useEffect(() => {
    // Clear old markers
    markersRef.current.forEach((marker) => map.current.removeLayer(marker));
    markersRef.current = []; // Reset the marker reference array

    // Add new markers
    images.forEach((image) => {
      const coord = {
        img: image,
        lat: image[0].lat,
        lng: image[0].lng,
        popup: image[0].lat + "-" + image[0].lng,
      };

      const marker = L.marker([coord.lat, coord.lng], {
        icon:
          selectedImage?.[0].lat + "-" + selectedImage?.[0].lng === coord.popup
            ? selectedImageCameraIcon
            : cameraIcon,
      }).addTo(map.current);

      // Render the static popup content
      const popupContentString = ReactDOMServer.renderToString(
        <PopupContent message={coord.popup} />
      );

      const popupContainer = document.createElement("div");
      popupContainer.innerHTML = popupContentString;

      marker.bindPopup(popupContainer);

      // Interactive React component rendering on popup open
      marker.on("popupopen", () => {
        const root = ReactDOM.createRoot(popupContainer);
        root.render(
          <PopupContent
            message={coord.popup}
            onClick={() => {
              setSelectedImage(coord.img);
              setRandImage(getRandImageGroup(randImage.image_id - 1));
            }}
          />
        );
      });

      // Store marker in the reference array for cleanup later
      markersRef.current.push(marker);
    });
  }, [images, selectedImage, setSelectedImage, randImage, setRandImage]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default LeafletMap;
