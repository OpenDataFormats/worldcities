"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview World Cities
 *
 * Convenience library for looking up city and country data using GPS coordinates and by name.
 */
const city_1 = require("./lib/city");
const country_1 = require("./lib/country");
module.exports = {
    getNearestCity: city_1.City.getNearest,
    City: city_1.City,
    Country: country_1.Country,
};
//# sourceMappingURL=index.js.map