/**
 * @fileoverview Convert the list of countries to a simple JSON array.
 */
const Parsers = require('./parsers');


const Wikipedias = Parsers.readJson('../data/wikipedia.json');


Parsers.serializeToJsonFile(
  Parsers.readFileLines('../data/countryInfo.txt').map(line => (Parsers.country(line, Wikipedias))),
  entity => (JSON.stringify(entity)),
  '[\n  %s\n]\n',
  ',\n  ',
  '../dist/data/countries.json',
);
