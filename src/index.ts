/**
 * @fileoverview World Cities
 *
 * Convenience library for looking up city and country data using GPS coordinates and by name.
 */
import path from 'path';

import { City } from './lib/city';
import { Country } from './lib/country';


const getSqliteFile = (): string => {
  return path.join(__dirname, './database/worldcities.sqlite');
};


export default {
  getNearestCity: City.getNearest,
  getSqliteFile,
  City,
  Country,
};
