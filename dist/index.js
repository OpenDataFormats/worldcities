'use strict';
/**
 * @fileoverview World Cities
 *
 * Convenience library for looking up city and country data using GPS coordinates and by name.
 */
const fs = require('fs').promises;

const cities = require('./data/cities.json');
const countries = require('./data/countries.json');
const schema = require('./schema/city.json');

/** @const {number} The multiplier in meters used in distance calculations. */
const DISTANCE_MULTIPLIER = 6371e3;


/**
 * Convert degrees to radians.
 *
 * @param  {number} degrees
 * @return {number}
 * @private
 */
const toRadians = (degrees) => {
  return degrees * Math.PI / 180;
};


/**
 * Compute the distance, in meters, between two GPS coordinate pairs. Uses the
 * [haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) to calculate
 * the distance between points on a sphere.
 *
 * @param  {number} lat1 Latitude of the first position
 * @param  {number} lng1 Longitude of the first position
 * @param  {number} lat2 Latitude of the second position
 * @param  {number} lng2 Longitude of the second position
 * @return {number} Distance in meters between the two coordinates
 * @private
 */
const getDistance = (lat1, lng1, lat2, lng2) => {
  const latDiffRad = toRadians(lat2 - lat1);
  const lngDiffRad = toRadians(lng2 - lng1);

  const a = Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(lngDiffRad / 2) * Math.sin(lngDiffRad / 2);

  return DISTANCE_MULTIPLIER * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};


/**
 * Build the city as a full object from JSON data, with the country as well.
 *
 * @param {Array.<Object>} cityRaw The array of city properties from the JSON data.
 * @return {Promise.<Object>}
 */
const buildCity = async (cityRaw) => {
  const country = await getCountry(cityRaw[3]);
  const city = {
    country,
    latitude: cityRaw[0],
    longitude: cityRaw[1],
    name: cityRaw[2],
    population: cityRaw[4],
    timezone: cityRaw[5],
  };
  return city;
};


/**
 * Get a country as a full object, pull the flag SVG and GeoJSON data.
 *
 * @param {string} countrycode The 2 letter ISO country code to look up.
 * @return {Promise.<Object>}
 */
const getCountry = async (countrycode) => {
  const countryRaw = countries.find(c => (c[0] === countrycode));

  const country = {
    areaSquareMeters: countryRaw[4],
    callingCode: countryRaw[10],
    capital: countryRaw[3],
    continent: countryRaw[6],
    countryCode: countryRaw[0],
    countryCode3: countryRaw[1],
    currencyCode: countryRaw[8],
    currencyName: countryRaw[9],
    languages: countryRaw[12],
    name: countryRaw[2],
    neighbors: countryRaw[13],
    population: countryRaw[5],
    postalCodeRegExp: countryRaw[11],
    tld: countryRaw[7],
    wikipedia: countryRaw[14],
  };

  return country;
};

/**
 * Get the city nearest to the GPS coordinates, as determined by the distance,
 * as the crow flies.
 *
 * @param {number} lat The latitude of the position.
 * @param {number} lng The longitude of the position.
 * @return {Object}
 */
const getNearestCity = async (lat, lng) => {
  // Nothing can be further than the circumference of the earth, use this as the maximum bound.
  let distance = 4e7;
  let city;
  let d;

  // Using a `for` loop performed 13.4% faster and 18.8% less memory than `cities.forEach`
  for (let i = 0; i < cities.length; i++) {
    d = getDistance(lat, lng, cities[i][0], cities[i][1]);
    if (d < distance) {
      distance = d;
      city = cities[i];
    }
  };

  return buildCity(city);
};


module.exports = {
  getNearestCity,
  schema,
};
