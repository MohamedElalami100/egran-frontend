import * as turf from "@turf/turf";

/**
 * Calculate the area of a polygon in square meters.
 * @param {Array} points - List of points with { lat, lng } attributes representing the polygon.
 * @returns {number} - The area of the polygon in square meters.
 */
const calculatePolygonArea = (points) => {
  // Convert points to GeoJSON format for Turf
  const polygon = turf.polygon([points.map(({ lat, lng }) => [lng, lat])]);

  // Calculate the area in square meters
  const area = turf.area(polygon);

  return area; // Area in square meters
};

export default calculatePolygonArea;
