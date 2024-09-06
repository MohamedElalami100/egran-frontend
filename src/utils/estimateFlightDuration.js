/**
 * Estimate the flight duration in minutes for a drone based on the area of a polygon.
 * @param {number} area - The area of the polygon in square meters.
 * @param {number} droneSpeed - The speed of the drone in meters per second.
 * @param {number} efficiency - The efficiency factor (between 0 and 1) to account for flight path and overlap.
 * @returns {number} - The estimated flight duration in minutes.
 */
const estimateFlightDuration = (area, droneSpeed = 50, efficiency = 0.75) => {
    // Effective coverage speed (meters per second)
    const effectiveSpeed = droneSpeed * efficiency;
  
    // Estimate the time in seconds to cover the area
    const timeInSeconds = area / effectiveSpeed;
  
    // Convert time to minutes
    const timeInMinutes = timeInSeconds / 60;
  
    return timeInMinutes;
  };
  
export default estimateFlightDuration;