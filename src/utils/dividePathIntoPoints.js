import { lineString, length, along } from '@turf/turf';

const dividePathIntoPoints = (path, numPoints) => {
  if (path.length < 2) {
    throw new Error("Path must have at least two points.");
  }

  // Create a lineString from the path points
  const line = lineString(path);

  // Calculate the total length of the path
  const totalLength = length(line, { units: 'kilometers' });

  // Calculate the spacing between each of the 30 points
  const spacing = totalLength / (numPoints - 1);

  // Generate the 30 points along the path
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const point = along(line, i * spacing, { units: 'kilometers' });
    points.push({
      lat: point.geometry.coordinates[0],
      lng: point.geometry.coordinates[0]
    });
  }

  return points;
};

export default dividePathIntoPoints;
