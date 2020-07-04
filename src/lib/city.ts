/**
 * City class structure definition.
 */
import { Country } from './country';
import { ICountry } from './types';
import { getDistance } from './util';

import cities from '../data/cities.json';
import schema from '../schemas/city.json';

// The minimum size of a "large" city.
// Large cities are * about 12% of the full database, or ~2926.
const LARGE_CITY_POPULATION = 150000;


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
   * Look up all of the cities matching a name. This can be used for partial matching
   * such as in an look up form field.
   */
  static getAllByName(name: string, countryCode?: string) {
    const matcher = new RegExp(name, 'i');

    let found = cities;

    if (countryCode) {
      found = found.filter(city => (city[3] === countryCode));
    }

    found = found.filter(city => (String(city[2]).match(matcher)));

    return found.map(City.fromRawJson);
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
   * Getter for the nested Country object that returns the full object with
   * geoJSON and flag SVG.
   */
  getCountry() {
    return Country.getByCountryCode(this.country.countryCode, true);
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


  /**
   * Get the country nearest to the GPS coordinates, as determined by the distance,
   * as the crow flies.
   */
  static getNearestCountry(lat: number, lng: number) {
    return City.getNearest(lat, lng).getCountry();
  }


  /**
   * Get the nearest large city.
   */
  static getNearestLargeCity(lat: number, lng: number) {
    let distance = 4e7;
    let city = cities[0];
    let d;

    // Using a `for` loop performed 13.4% faster and 18.8% less memory than `cities.forEach`
    for (let i = 0; i < cities.length; i++) {
      if (cities[i][4] > LARGE_CITY_POPULATION) {
        d = getDistance(lat, lng, Number(cities[i][0]), Number(cities[i][1]));
        if (d < distance) {
          distance = d;
          city = cities[i];
        }
      }
    };

    return City.fromRawJson(city);
  }


  static get schema() {
    return schema;
  }
}
