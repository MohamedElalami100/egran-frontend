import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import "./leafletmap.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import calculateOptimalPath from "@/utils/calculateOptimalPath ";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import dividePathIntoPoints from "@/utils/dividePathIntoPoints";

const InteractiveMap = ({ setPolygon }) => {
  // Define the custom camera icon
  const positionIcon = L.icon({
    iconUrl: "/src/assets/Position-Marker.png", // Path to camera icon
    //iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which corresponds to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userPosition, setUserPosition] = useState(null);
  const [shapeDrawn, setShapeDrawn] = useState(false);

  useEffect(() => {
    if (map.current) return; // Stops map from initializing more than once

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(52.507932, 13.338414),
      zoom: 14,
    });

    // Create a MapTiler Layer with satellite style
    const mtLayer = new MaptilerLayer({
      apiKey: "iBsJvpwcweMJ91GDv8rm",
      style: "satellite",
    }).addTo(map.current);

    // Initialize the FeatureGroup to store editable layers
    const drawnItems = new L.FeatureGroup();
    map.current.addLayer(drawnItems);

    // Define the style options for the drawn polygons
    const polygonStyle = {
      color: "#FFE500",
      fillColor: "#006633",
      fillOpacity: 0.4,
    };

    // Initialize the draw control and pass it the FeatureGroup of editable layers
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: !shapeDrawn ? { shapeOptions: polygonStyle } : false,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
    });

    map.current.addControl(drawControl);
    // Event listener for when a shape is drawn
    map.current.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
      setPolygon(layer.toGeoJSON());
      setShapeDrawn(true);

      // Disable drawing after a shape is drawn
      map.current.removeControl(drawControl);

      // Calculate and draw the optimal path
      const path = calculateOptimalPath(layer.toGeoJSON(), 100);
      drawPath(path);
    });

    // Request and display user's location
    map.current.locate({ setView: true, maxZoom: 16 });

    map.current.on("locationfound", (e) => {
      const { lat, lng } = e.latlng;
      setUserPosition([lat, lng]); // Set user position state
      L.marker([lat, lng], {
        icon: positionIcon,
      }).addTo(map.current);
    });

    map.current.on("locationerror", (e) => {
      console.error("Location access denied.", e.message);
    });
  }, [shapeDrawn]);

  const drawPath = (path) => {
    const latLngs = path.map(([lat, lng]) => L.latLng(lat, lng));
    L.polyline(latLngs, {
      color: "yellow", // Path color
      weight: 4, // Path thickness
      opacity: 0.7, // Path transparency
      dashArray: "8, 8", // Makes the path dashed
    }).addTo(map.current);
  };

  return (
    <div>
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
};

export default InteractiveMap;
