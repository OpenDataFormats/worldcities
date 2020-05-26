/**
 * @fileoverview Convert the list of shapes to a simple JSON object mapping the ISO
 * country code to the geoJSON. Load the country data only to map the Geonames ID in
 * joining the two datasets.
 */
const Parsers = require('./parsers');


const countries = Parsers.readFileLines('../data/countryInfo.txt');
const shapes = Parsers.readFileLines('../data/shapes_all_low.txt', true);


// Create a mapping of GeoName's ID to ISO country code
const idsToCountry = {};
countries.forEach((countryParts) => {
  idsToCountry[countryParts[16]] = countryParts[0];
});


// Merge the country code with the geoJSON into a mapping
const entities = {};
shapes.forEach((shapesParts) => {
  const countryCode = idsToCountry[shapesParts[0]];

  if (countryCode) {
    entities[countryCode] = shapesParts[1];
  }
});

Parsers.writeJsonToFiles(entities, '../dist/geojson/')
