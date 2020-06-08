/**
 * Static utility methods for computing distances, etc.
 */


/** @const {number} The multiplier in meters used in distance calculations. */
const DISTANCE_MULTIPLIER = 6371e3;


/**
 * Convert degrees to radians.
 */
const toRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
};


/**
 * Compute the distance, in meters, between two GPS coordinate pairs. Uses the
 * [haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) to calculate
 * the distance between points on a sphere.
 */
export const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const latDiffRad = toRadians(lat2 - lat1);
  const lngDiffRad = toRadians(lng2 - lng1);

  const a = Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(lngDiffRad / 2) * Math.sin(lngDiffRad / 2);

  return DISTANCE_MULTIPLIER * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
