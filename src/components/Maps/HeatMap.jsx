import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat"; // Import Leaflet Heat plugin
import "./leafletmap.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const HeatMap = ({ images, polygonPoints }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 13.338414, lat: 44.507932 };
  const [zoom] = useState(14);

  useEffect(() => {
    //if (map.current) return; // Prevent re-initializing the map

    // Initialize the map
    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    // Add a load event listener
    map.current.on("load", () => {
      console.log("Map has finished loading");
    });

    // Add a MapTiler Layer with satellite style
    const mtLayer = new MaptilerLayer({
      apiKey: "iBsJvpwcweMJ91GDv8rm",
      style: "satellite",
    }).addTo(map.current);

    // Define the polygon coordinates
    const polygonCoordinates = [];
    polygonPoints.forEach((point) => {
      polygonCoordinates.push([point.lat, point.lng]);
    });

    const polygonStyle = {
      color: "#FFE500",
      fillColor: "#006633",
      fillOpacity: 0.4,
    };

    // Create a polygon and add it to the map
    const polygon = L.polygon(polygonCoordinates, polygonStyle).addTo(
      map.current
    );

    // Fit the map view to the polygon bounds
    map.current.fitBounds(polygon.getBounds());

    // Prepare the heatmap data using images and their tutaCount
    const heatmapData = [];
    images.forEach((image) => {
      const { lat, lng, tutaCount } = image[0]; // Assume images is an array of objects with [lat, lng, tutaCount]
      heatmapData.push([lat, lng, tutaCount / 10]); // Normalize the intensity by dividing tutaCount
    });

    // Add the heatmap layer to the map
    L.heatLayer(heatmapData, {
      radius: 25, // Radius of each point in the heatmap
      blur: 15, // Blurring of points
      maxZoom: zoom, // Maximum zoom level for the heatmap
      max: 1.0, // Maximum intensity
      gradient: {
        0.0: "green",
        0.5: "yellow",
        1.0: "red", // Color scale from green (low) to red (high)
      },
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove(); // Cleanup on unmount
      }
    };
  }, [center.lat, center.lng, images, polygonPoints, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default HeatMap;
