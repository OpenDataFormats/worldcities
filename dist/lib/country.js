"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
/**
 * Country class structure definition.
 */
const countries_json_1 = __importDefault(require("../data/countries.json"));
class Country {
    constructor(areaSquareMeters, callingCode, capital, continent, countryCode, countryCode3, currencyCode, currencyName, languages, name, neighbors, population, postalCodeRegExp, tld, wikipedia) {
        this.areaSquareMeters = areaSquareMeters;
        this.callingCode = callingCode;
        this.capital = capital;
        this.continent = continent;
        this.countryCode = countryCode;
        this.countryCode3 = countryCode3;
        this.currencyCode = currencyCode;
        this.currencyName = currencyName;
        this.languages = languages;
        this.name = name;
        this.neighbors = neighbors;
        this.population = population;
        this.postalCodeRegExp = postalCodeRegExp;
        this.tld = tld;
        this.wikipedia = wikipedia;
    }
    static fromRawJson(countryRaw) {
        return new Country(countryRaw[4], countryRaw[10], countryRaw[3], countryRaw[6], countryRaw[0], countryRaw[1], countryRaw[8], countryRaw[9], countryRaw[12], countryRaw[2], countryRaw[13], countryRaw[5], countryRaw[11], countryRaw[7], countryRaw[14]);
    }
    /**
     * Get a country by its 2 letter country code.
     */
    static getByCountryCode(countrycode) {
        const countryRaw = countries_json_1.default.find(c => (c[0] === countrycode));
        if (countryRaw === undefined) {
            throw new Error(`Failed to find country with country code ${countrycode}`);
        }
        return Country.fromRawJson(countryRaw);
    }
}
exports.Country = Country;
//# sourceMappingURL=country.js.map