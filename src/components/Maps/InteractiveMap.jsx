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

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You clicked here</Popup>
    </Marker>
  );
};

const InteractiveMap = ({ setPolygon }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
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
      color: "white",
      fillColor: "gray",
      fillOpacity: 0.5,
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
