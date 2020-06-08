/**
 * Country class structure definition.
 */
import path from 'path';
import fs from 'fs';

import countries from '../data/countries.json';
import { IOpenObject } from './types';


 export class Country {
  constructor(
    readonly areaSquareMeters: number,
    readonly callingCode: string,
    readonly capital: string,
    readonly continent: string,
    readonly countryCode: string,
    readonly countryCode3: string,
    readonly currencyCode: string,
    readonly currencyName: string,
    readonly languages: string[],
    readonly name: string,
    readonly neighbors: string[],
    readonly population: number,
    readonly postalCodeRegExp: string,
    readonly tld: string,
    readonly wikipedia: string,
    readonly geoJSON?: IOpenObject,
    readonly flagSVG?: string,
   ) {}


  static fromRawJson(countryRaw: any[], geoJSON?: IOpenObject, flagSVG?: string) {
    return new Country(
      countryRaw[4],
      countryRaw[10],
      countryRaw[3],
      countryRaw[6],
      countryRaw[0],
      countryRaw[1],
      countryRaw[8],
      countryRaw[9],
      countryRaw[12],
      countryRaw[2],
      countryRaw[13],
      countryRaw[5],
      countryRaw[11],
      countryRaw[7],
      countryRaw[14],
      geoJSON,
      flagSVG,
    );
  }

  /**
   * Get a country by its 2 letter country code. Pull the geoJSON and flag SVG data as well
   * by setting `full=true`.
   */
  static getByCountryCode(countrycode: string, full?: boolean) {
    const countryRaw: (any[] | undefined) = countries.find(c => (c[0] === countrycode));
    let flagSVG;
    let geoJSON;

    if (countryRaw === undefined) {
      throw new Error(`Failed to find country with country code ${countrycode}`);
    }

    if (!!full) {
      const countryCode = countryRaw[0].toLowerCase();

      // Pull the geoJSON data
      const geoJsonRaw = fs.readFileSync(
        path.join(__dirname, `../data/geojson/${countryCode}.json`),
        'utf-8',
      );
      geoJSON = JSON.parse(geoJsonRaw);

      // Pull the flag SVG
      flagSVG = fs.readFileSync(
        path.join(__dirname, `../data/flags/${countryCode}.svg`),
        'utf-8',
      );
    }

    return Country.fromRawJson(countryRaw, geoJSON, flagSVG);
  }
}
