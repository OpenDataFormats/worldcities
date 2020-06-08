"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
/**
 * City class structure definition.
 */
const country_1 = require("./country");
const util_1 = require("./util");
const cities_json_1 = __importDefault(require("../data/cities.json"));
const city_json_1 = __importDefault(require("../schemas/city.json"));
class City {
    constructor(latitude, longitude, name, population, timezone, country) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.population = population;
        this.timezone = timezone;
        this.country = country;
        this.schema = city_json_1.default;
    }
    static fromRawJson(cityRaw, country) {
        return new City(cityRaw[0], cityRaw[1], cityRaw[2], cityRaw[4], cityRaw[5], country);
    }
    /**
     * Get the city nearest to the GPS coordinates, as determined by the distance,
     * as the crow flies.
     */
    static getNearest(lat, lng) {
        // Nothing can be further than the circumference of the earth, use this as the maximum bound.
        let distance = 4e7;
        let city = cities_json_1.default[0];
        let d;
        // Using a `for` loop performed 13.4% faster and 18.8% less memory than `cities.forEach`
        for (let i = 0; i < cities_json_1.default.length; i++) {
            d = util_1.getDistance(lat, lng, Number(cities_json_1.default[i][0]), Number(cities_json_1.default[i][1]));
            if (d < distance) {
                distance = d;
                city = cities_json_1.default[i];
            }
        }
        ;
        const country = country_1.Country.getByCountryCode(String(city[3]));
        return City.fromRawJson(city, country);
    }
}
exports.City = City;
//# sourceMappingURL=city.js.map