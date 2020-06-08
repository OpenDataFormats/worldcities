/**
 * @fileoverview World Cities
 *
 * Convenience library for looking up city and country data using GPS coordinates and by name.
 */
// import {promises as fs} from 'fs';
import { ICity, ICountry } from './types';
import { City } from './city';
import { Country } from './country';

import cities from '../dist/data/cities.json';
import countries from '../dist/data/countries.json';
import schema from '../schemas/city.json';

/** @const {number} The multiplier in meters used in distance calculations. */
const DISTANCE_MULTIPLIER = 6371e3;


/**
 * Convert degrees to radians.
 *
 * @param  {number} degrees
 * @return {number}
 * @private
 */
const toRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
};


/**
 * Compute the distance, in meters, between two GPS coordinate pairs. Uses the
 * [haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) to calculate
 * the distance between points on a sphere.
 *
 * @private
 */
const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const latDiffRad = toRadians(lat2 - lat1);
  const lngDiffRad = toRadians(lng2 - lng1);

  const a = Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(lngDiffRad / 2) * Math.sin(lngDiffRad / 2);

  return DISTANCE_MULTIPLIER * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};




/**
 * Get a country as a full object, pull the flag SVG and GeoJSON data.
 */
const getCountry = (countrycode: string): ICountry => {
  const countryRaw: (any[] | undefined) = countries.find(c => (c[0] === countrycode));

  if (countryRaw === undefined) {
    throw new Error(`Failed to find country with country code ${countrycode}`);
  }
  return Country.fromRawJson(countryRaw);
};


/**
 * Get the city nearest to the GPS coordinates, as determined by the distance,
 * as the crow flies.
 */
const getNearestCity = (lat: number, lng: number): ICity => {
  // Nothing can be further than the circumference of the earth, use this as the maximum bound.
  let distance = 4e7;
  let city = cities[0];
  let d;

  // Using a `for` loop performed 13.4% faster and 18.8% less memory than `cities.forEach`
  for (let i = 0; i < cities.length; i++) {
    d = getDistance(lat, lng, Number(cities[i][0]), Number(cities[i][1]));
    if (d < distance) {
      distance = d;
      city = cities[i];
    }
  };
  const country = getCountry(`${city[3]}`);
  return City.fromRawJson(city, country);
};


module.exports = {
  getNearestCity,
  schema,
};
