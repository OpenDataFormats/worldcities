/**
 * @fileoverview Convenient mapping of continent code to country name.
 */
const fs = require('fs');
const path = require('path');

const Parsers = require('./parsers');
const countries = require('../src/data/countries.json');

const continents = {};

countries.forEach(country => {
  const continent = country[6];
  if (!continents[continent]) {
    continents[continent] = [];
  }

  const name = country[0];
  if (!continents[continent].includes(name)) {
    continents[continent].push(name);
  }
});

Object.keys(continents).forEach((key) => {
  continents[key] = continents[key].sort();
});

console.info('Save the continents to JSON file');
fs.writeFileSync(
  path.join(__dirname, '../src/data/continents.json'),
  JSON.stringify(continents, null, 2),
);
