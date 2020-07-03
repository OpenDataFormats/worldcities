/**
 * @fileoverview Type definitions common across the codebase.
 */


 // Open ended JS object for unknown JSON
export interface IOpenObject {
  [propName: string]: any;
}


export interface ICity {
  country: ICountry;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  timezone: string;
  districts?: IDistrict[];
}


export interface ICountry {
  areaSquareMeters: number;
  callingCode: string;
  capital: string;
  continent: string;
  countryCode: string;
  countryCode3: string;
  currencyCode: string;
  currencyName: string;
  flagSVG?: string;
  geoJSON?: IOpenObject;
  languages: string[];
  name: string;
  neighbors: string[];
  population: number;
  postalCodeRegExp: string;
  tld: string;
  wikipedia: string;
}


export interface IDistrict {
  name: string;
  population: number;
}
