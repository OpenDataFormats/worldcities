/**
 * Country class structure definition.
 */
import countries from '../data/countries.json';


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
   ) {}


  static fromRawJson(countryRaw: any[]) {
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
    );
  }

  /**
   * Get a country by its 2 letter country code.
   */
  static getByCountryCode(countrycode: string) {
    const countryRaw: (any[] | undefined) = countries.find(c => (c[0] === countrycode));

    if (countryRaw === undefined) {
      throw new Error(`Failed to find country with country code ${countrycode}`);
    }
    return Country.fromRawJson(countryRaw);
  }
}
