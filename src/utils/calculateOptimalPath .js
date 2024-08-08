import { polygon, area } from '@turf/turf';

const calculateOptimalPath = (polygon, altitude) => {
  // Extract the coordinates of the polygon
  const coords = polygon.geometry.coordinates[0];

  // Calculate the area of the polygon using turf.js
  const polygonArea = calculatePolygonArea(coords) / 10000;
  console.log(polygonArea);

  // Adjust the spacing based on area and altitude
  const spacing = Math.sqrt(polygonArea) * altitude * 0.000001; // Adjust this factor as needed

  // Generate the grid points within the bounding box
  let path = [];
  let direction = 1; // 1 for left to right, -1 for right to left

  // Iterate through the bounding box defined by minLat, maxLat, minLng, and maxLng
  const [minLat, maxLat] = [Math.min(...coords.map(coord => coord[1])), Math.max(...coords.map(coord => coord[1]))];
  const [minLng, maxLng] = [Math.min(...coords.map(coord => coord[0])), Math.max(...coords.map(coord => coord[0]))];

  for (let lat = minLat; lat <= maxLat; lat += spacing) {
    let line = [];
    for (let lng = minLng; lng <= maxLng; lng += spacing) {
      if (isPointInPolygon([lng, lat], coords)) {
        line.push([lat, lng]);
      }
    }
    if (direction === -1) {
      line.reverse();
    }
    path = path.concat(line);
    direction *= -1;
  }

  return path;
};

// Function to calculate the area of a polygon using turf.js
const calculatePolygonArea = (coords) => {
  // Create a turf.js polygon feature
  const poly = polygon([coords]);

  // Calculate the area using turf.js
  const polygonArea = area(poly);

  return polygonArea;
};
  
  
  // Helper function to check if a point is inside a polygon
  const isPointInPolygon = (point, vs) => {
    const x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  export default calculateOptimalPath;
