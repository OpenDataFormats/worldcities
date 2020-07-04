/**
 * @fileoverview Static methods for parsing the parts of the lines in tab separated value files of each data type. Methods should be usable in Array.map, returning null for invalid rows, so they can easily be filtered out.
 *
 * @see The [GeoNames readme.txt](https://download.geonames.org/export/dump/readme.txt) for the ordering and type of each field.
 */
const fs = require('fs');
const path = require('path');
const util = require('util');

const EMPTY_SPACE = new RegExp(`
(  )*`, 'g');
const IGNORE_CODES = ['PPLX'];


 /**
  * Extract the data for a city.
  *
  * @param {Array.<string>} parts The components of the city data.
  * @return {Array.<object>} The parts sorted and converted to their proper type.
  */
 const city = (parts) => {
  let city = null;

  if(parts.length === 19 && !IGNORE_CODES.includes(parts[7])) {
    city = [
      // Latitude and longitude
      Number.parseFloat(parts[4]),
      Number.parseFloat(parts[5]),

      // ASCII city name
      parts[2],

      // ISO country code
      parts[8],

      // Population
      Number.parseInt(parts[14]),

      // Timezone
      parts[17],
    ];
  }

  return city;
};


/**
 * Extract the data for a country.
 *
 * @param {Array.<string>} parts The components of country data.
 * @param {Object.<string,string>} wikipedias Mapping of country code to Wikipedia article.
 * @return {Array.<object>} The parts sorted and converted to their proper types.
 */
const country = (parts, wikipedias) => {
  let country = null;

  if(parts.length === 19) {
    country = [
      // ISO country codes
      parts[0],
      parts[1],

      // ASCII country name
      parts[4],

      // Capital of the country
      parts[5],

      // Area of the country in square meters
      Number.parseInt(parts[6]),

      // Population
      Number.parseInt(parts[7]),

      // Continent
      parts[8],

      // TLD
      parts[9],

      // Currency code and name
      parts[10],
      parts[11],

      // Phone country code
      parts[12],

      // Postal code regular expression
      parts[14],

      // Languages
      parts[15].split(','),

      // Neighboring countries
      parts[17].split(',').filter(n => (!!n.length)),

      // Wikipedia
      wikipedias[parts[0]] || '',
    ];
  }

  return country;
};


/**
 * Check a line for it being parsable. It should not be blank and not be a comment.
 * Convenience method for using in Array.filter on lines before passing to the parsing method.
 */
const isParsable = (line) => {
  return line.length !== 0 && line[0] !== '#';
};


/**
 * Read in the specified file and return as an array of lines split by tabs.
 *
 * @param {string} filepath The relative path to the file.
 * @param {boolean} removeFirstLine (optional) Remove the first line, column names.
 * @return {Array.<string>}
 */
const readFileLines = (filepath, removeFirstLine = false) => {
  const tsv = fs.readFileSync(path.join(__dirname, filepath), 'utf8');
  const lines = tsv.split('\n');

  if (removeFirstLine) {
    lines.shift();
  }

  return lines.filter(isParsable).map(line => (line.split('\t')));
}


/**
 * Read a file, parse as JSON, and return.
 *
 * @param {string} filepath The relative path to the JSON file.
 * @return {Object}
 */
const readJson = (filepath) => {
  const json = fs.readFileSync(path.join(__dirname, filepath), 'utf8');
  return JSON.parse(json);
};


/**
 * Read an SVG file and strip out newlines and indentation.
 *
 * @param {*} filepath
 */
const readSvgFile = (filepath) => {
  const svg = fs.readFileSync(path.join(__dirname, filepath), 'utf8');
  return svg.replace(EMPTY_SPACE, '');
};


 /**
 * Write the contents of an array of parsed objects to a compact text file.
 * Can be JSON, CSV, etc, determined by the filename extension, the wrapper,
 * and the joiner.
 *
 * @param {Array.<object>} entities The parsed objects to write.
 * @param {Function.<object>} serializer A function to convert each object to its serialized JSON.
 * @param {string} wrapper A `printf` style string into which the combined serialized objects will be placed.
 * @param {string} joiner A string to use in joining each line to be written.
 * @param {string} filepath Relative file path to write the resulting JSON output.
 */
const serializeToFile = (entities, serializer, wrapper, joiner, filepath) => {
  const txt = entities.map(serializer).join(joiner);
  const output = util.format(wrapper, txt);
  fs.writeFileSync(path.join(__dirname, filepath), output);
};


/**
 * Write an object of string key to JSON value to individual JSON files by key.
 *
 * @param {Object.<string,Object>} entities Map of keys to JSON to be written.
 * @param {string} pathprefix The relative folder path into which files will be written.
 */
const writeJsonToFiles = (entities, pathprefix) => {
  Object.entries(entities).forEach(([key, value]) => {
    const filepath = path.join(__dirname, pathprefix, `${key.toLowerCase()}.json`);
    fs.writeFileSync(filepath, value);
  });
};


module.exports = {
  city,
  country,
  readFileLines,
  readJson,
  readSvgFile,
  serializeToFile,
  writeJsonToFiles,
};
