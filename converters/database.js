/**
 * @fileoverview Static methods for creating and populating a SQLite database with the
 * city and country data, including geoJSON and flag SVG.
 */
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const Parsers = require('./parsers');

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
const SQL_INSERT_CITIES = `INSERT INTO cities
  VALUES (${Array(SQL_COLUMNS_CITIES.length).fill('?').join(',')})`;

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
  '"geojson" BLOB',
  '"flag" BLOB',
];
const SQL_CREATE_COUNTRIES = `CREATE TABLE "countries" (${SQL_COLUMNS_COUNTRIES.join(',')})`;
const SQL_INSERT_COUNTRIES = `INSERT INTO countries
  VALUES (${Array(SQL_COLUMNS_COUNTRIES.length).fill('?').join(',')})`;


let db;


const open = (filepath) => {
  db = new sqlite3.Database(path.join(__dirname, filepath));
  db.run('PRAGMA journal_mode = MEMORY');
};


const close = () => {
  db.close();
};


const saveCities = (cityData) => {
  db.serialize(() => {
    db.run(SQL_DROP_CITIES);
    db.run(SQL_CREATE_CITIES);
    const citiesStmt = db.prepare(SQL_INSERT_CITIES);
    db.parallelize(() => (cityData.forEach(row => (citiesStmt.run(row)))));
    citiesStmt.finalize();
  });
};


const saveCountries = (countryData, geojson) => {
  db.serialize(() => {
    db.run(SQL_DROP_COUNTRIES);
    db.run(SQL_CREATE_COUNTRIES);
    const countriesStmt = db.prepare(SQL_INSERT_COUNTRIES);
    countryData.forEach(row => {
      row[12] = row[12].join(',');
      row[13] = row[13].join(',');
      row.push(geojson[row[0]]);
      row.push(Parsers.readSvgFile(`../src/data/flags/${row[0].toLowerCase()}.svg`));
      countriesStmt.run(row);
    });
    countriesStmt.finalize();
  });
};


module.exports = {
  close,
  open,
  saveCities,
  saveCountries,
};
