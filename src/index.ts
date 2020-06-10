/**
 * @fileoverview World Cities
 *
 * Convenience library for looking up city and country data using GPS coordinates and by name.
 */
import path from 'path';

import { City } from './lib/city';
import { Country } from './lib/country';


const getSqlitePath = (): string => {
  return path.join(__dirname, './data/worldcities.sqlite');
};


const WorldCities = {
  City,
  Country,
  getAllByName: City.getAllByName,
  getByName: City.getByName,
  getCountry: Country.getByCountryCode,
  getNearestCity: City.getNearest,
  getNearestCountry: City.getNearestCountry,
  getNearestLargeCity: City.getNearestLargeCity,
  getSqlitePath,
};

module.exports = WorldCities;
export default WorldCities;
