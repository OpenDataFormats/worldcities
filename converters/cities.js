/**
 * @fileoverview Convert the list of cities around the world with a population
 * of more than 15,000 people to a simple JSON array. Convert the list of countries to a simple JSON array.
 */
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const Parsers = require('./parsers');

const wikipedias = Parsers.readJson('../data/wikipedia.json');
const cityData = Parsers.readFileLines('../data/cities15000.txt').map(Parsers.city);
const countryData = Parsers
  .readFileLines('../data/countryInfo.txt')
  .map(line => (Parsers.country(line, wikipedias)));

const SQL_DROP_CITIES = 'DROP TABLE IF EXISTS cities';
const SQL_COLUMNS_CITIES = [
  '"latitude" REAL',
  '"longitude" REAL',
  '"name" TEXT',
  '"country_code" TEXT',
  '"population" INTEGER',
  '"timezone" TEXT',
];
const SQL_CREATE_CITIES = `CREATE TABLE "cities" (${SQL_COLUMNS_CITIES.join(',')})`;

const SQL_DROP_COUNTRIES = 'DROP TABLE IF EXISTS countries';
const SQL_COLUMNS_COUNTRIES = [
  '"country_code" TEXT',
  '"country_code_ext" TEXT',
  '"name" TEXT',
  '"capital" TEXT',
  '"area" INTEGER',
  '"population" INTEGER',
  '"continent" TEXT',
  '"tld" TEXT',
  '"currency_code" TEXT',
  '"currency_name" TEXT',
  '"phone_country_code" TEXT',
  '"postal_regexp" TEXT',
  '"languages" TEXT',
  '"neighbors" TEXT',
  '"wikipedia" TEXT',
];
const SQL_CREATE_COUNTRIES = `CREATE TABLE "countries" (${SQL_COLUMNS_COUNTRIES.join(',')})`;


// Save the parsed data to JSON files

 Parsers.serializeToFile(
  cityData,
  entity => (JSON.stringify(entity)),
  '[\n  %s\n]\n',
  ',\n  ',
  '../dist/data/cities.json',
);


Parsers.serializeToFile(
  countryData,
  entity => (JSON.stringify(entity)),
  '[\n  %s\n]\n',
  ',\n  ',
  '../dist/data/countries.json',
);


// Write the data to a SQLite database file

const db = new sqlite3.Database(path.join(__dirname, '../dist/data/worldcities.sqlite'));

db.serialize(() => {
  db.run('PRAGMA journal_mode = MEMORY');
  db.run(SQL_DROP_CITIES);
  db.run(SQL_CREATE_CITIES);

  const citiesStmt = db.prepare(
    `INSERT INTO cities VALUES (${Array(SQL_COLUMNS_CITIES.length).fill('?').join(',')})`,
  );
  db.parallelize(() => (cityData.forEach(row => (citiesStmt.run(row)))));
  citiesStmt.finalize();

  db.run(SQL_DROP_COUNTRIES);
  db.run(SQL_CREATE_COUNTRIES);

  const countriesStmt = db.prepare(
    `INSERT INTO countries VALUES (${Array(SQL_COLUMNS_COUNTRIES.length).fill('?').join(',')})`,
  );
  countryData.forEach(row => {
    row[12] = row[12].join(',');
    row[13] = row[13].join(',');
    countriesStmt.run(row);
  });
  countriesStmt.finalize();
});

db.close();
