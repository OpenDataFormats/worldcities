/**
 * City class structure definition.
 */
import { ICountry } from './types';
import schema from '../schemas/city.json';


export class City {
  readonly schema = schema;

  constructor(
    readonly latitude: number,
    readonly longitude: number,
    readonly name: string,
    readonly population: number,
    readonly timezone: string,
    readonly country: ICountry,
  ) {}


  static fromRawJson(cityRaw: any[], country: ICountry) {
   return new City(
    cityRaw[0],
    cityRaw[1],
    cityRaw[2],
    cityRaw[4],
    cityRaw[5],
    country,
   );
 }
}
