/**
 * @fileoverview Convert the list of cities around the world with a population
 * of more than 15,000 people to a simple JSON array.
 */
const Parsers = require('./parsers');


Parsers.serializeToJsonFile(
  Parsers.readFileLines('../data/cities15000.txt').map(Parsers.city),
  entity => (JSON.stringify(entity)),
  '[\n  %s\n]\n',
  ',\n  ',
  '../dist/data/cities.json',
);
