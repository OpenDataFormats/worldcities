"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview World Cities
 *
 * Convenience library for looking up city and country data using GPS coordinates and by name.
 */
const path_1 = __importDefault(require("path"));
const city_1 = require("./lib/city");
const country_1 = require("./lib/country");
const getSqliteFile = () => {
    return path_1.default.join(__dirname, './database/worldcities.sqlite');
};
module.exports = {
    getNearestCity: city_1.City.getNearest,
    getSqliteFile,
    City: city_1.City,
    Country: country_1.Country,
};
//# sourceMappingURL=index.js.map