/**
 * @fileoverview World Cities
 *
 * Convenience library for looking up city and country data using GPS coordinates and by name.
 */
import { City } from './lib/city';
import { Country } from './lib/country';


module.exports = {
  getNearestCity: City.getNearest,
  City,
  Country,
};
