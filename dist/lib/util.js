"use strict";
/**
 * Static utility methods for computing distances, etc.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = void 0;
/** @const {number} The multiplier in meters used in distance calculations. */
const DISTANCE_MULTIPLIER = 6371e3;
/**
 * Convert degrees to radians.
 */
const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
};
/**
 * Compute the distance, in meters, between two GPS coordinate pairs. Uses the
 * [haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) to calculate
 * the distance between points on a sphere.
 */
exports.getDistance = (lat1, lng1, lat2, lng2) => {
    const latDiffRad = toRadians(lat2 - lat1);
    const lngDiffRad = toRadians(lng2 - lng1);
    const a = Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(lngDiffRad / 2) * Math.sin(lngDiffRad / 2);
    return DISTANCE_MULTIPLIER * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
//# sourceMappingURL=util.js.map