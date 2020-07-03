/**
 * @fileoverview Convert the list of cities around the world with a population
 * of more than 15,000 people to a simple JSON array. Convert the list of countries to a
 * simple JSON array.
 *
 * Convert the list of shapes to a simple JSON object mapping the ISO
 * country code to the geoJSON. Load the country data only to map the Geonames ID in
 * joining the two datasets.
 */
const Cleaners = require('./cleaners');
const Database = require('./database');
const Parsers = require('./parsers');

const wikipedias = Parsers.readJson('../data/wikipedia.json');
const cityData = Parsers
  .readFileLines('../data/cities15000.txt')
  .map(Parsers.city)
  .map(Cleaners.city)
  .concat(Cleaners.cityFlush())
  .filter(row => (row !== undefined));
const countries = Parsers.readFileLines('../data/countryInfo.txt');
const countryData = countries.map(line => (Parsers.country(line, wikipedias)));
const shapes = Parsers.readFileLines('../data/shapes_all_low.txt', true);


const infolog = (...args) => { console.info(...args); };

infolog('Save the parsed cities to JSON file');
Parsers.serializeToFile(
  cityData,
  entity => (JSON.stringify(entity)),
  '[\n  %s\n]\n',
  ',\n  ',
  '../src/data/cities.json',
);


infolog('Save the parsed countries to JSON file');
Parsers.serializeToFile(
  countryData,
  entity => (JSON.stringify(entity)),
  '[\n  %s\n]\n',
  ',\n  ',
  '../src/data/countries.json',
);


// Create a mapping of GeoName's ID to ISO country code
const idsToCountry = {};
countries.forEach((countryParts) => {
  idsToCountry[countryParts[16]] = countryParts[0];
});


// Merge the country code with the geoJSON into a mapping
const geojson = {};
shapes.forEach((shapesParts) => {
  const countryCode = idsToCountry[shapesParts[0]];

  if (countryCode) {
    geojson[countryCode] = shapesParts[1];
  }
});

infolog('Save the parsed shapes to JSON files');
Parsers.writeJsonToFiles(geojson, '../src/data/geojson/')


// Write the data to a SQLite database file
infolog('Creating the SQLite database');
Database.open('../data/worldcities.sqlite');

infolog('Saving the cities to the database');
Database.saveCities(cityData);

infolog('Saving the countries to the database');
Database.saveCountries(countryData, geojson);

infolog('Closing the database');
Database.close();
