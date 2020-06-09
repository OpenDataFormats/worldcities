/**
 * City class structure definition.
 */
import { Country } from './country';
import { ICountry } from './types';
import { getDistance } from './util';

import cities from '../data/cities.json';
import schema from '../schemas/city.json';


export class City {
  constructor(
    readonly latitude: number,
    readonly longitude: number,
    readonly name: string,
    readonly population: number,
    readonly timezone: string,
    readonly country: ICountry,
  ) {}


  static fromRawJson(cityRaw: any[]) {
    const country = Country.getByCountryCode(String(cityRaw[3]));
    return new City(
      cityRaw[0],
      cityRaw[1],
      cityRaw[2],
      cityRaw[4],
      cityRaw[5],
      country,
    );
  }


  /**
   * Look up a city by name, returning the first one that matches.
   * Optionally also filter on country code.
   */
  static getByName(name: string, countryCode?: string) {
    const matcher = new RegExp(name, 'i');
    for (let i = 0; i < cities.length; i++) {
      if (countryCode && cities[i][3] !== countryCode) {
        continue;
      }

      if (String(cities[i][2]).match(matcher)) {
        return City.fromRawJson(cities[i]);
      }
    }
    return undefined;
  }


  /**
   * Get the city nearest to the GPS coordinates, as determined by the distance,
   * as the crow flies.
   */
  static getNearest(lat: number, lng: number) {
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

    return City.fromRawJson(city);
  }


  static get schema() {
    return schema;
  }
}
