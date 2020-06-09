# World Cities

__BETA Absolutely not production ready! Do not even think about using this version!__

[![Coverage Status](https://coveralls.io/repos/github/OpenDataFormats/worldcities/badge.svg?branch=master)](https://coveralls.io/github/OpenDataFormats/worldcities?branch=master)

24,343 world cities and 252 countries.

A convenient wrapper for the [GeoNames](https://www.geonames.org/) database of world cities data.

The data from the GeoNames tab seperated values files are parsed and normalized into a JSON object for quick lookup and distance calculations. The data for each city's country is also normalized, indexed by [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code, paired with the country's flag's SVG, [GeoJSON](https://geojson.org/) of its boundaries, and relative URL to Wikipedia page.

## Usage

### Query for a city by GPS

```javascript
const WorldCities = require('worldcities');
const city = WorldCities.getNearestCity(35.6895, 139.69171);

// {
//   "latitude": 35.6895,
//   "longitude": 139.69171,
//   "name": "Tokyo",
//   "population": 8336599,
//   "timezone": "Asia/Tokyo",
//   "country": {
//     "areaSquareMeters": 377835,
//     "callingCode": "81",
//     "capital": "Tokyo",
//     "continent": "AS",
//     "countryCode": "JP",
//     "countryCode3": "JPN",
//     "currencyCode": "JPY",
//     "currencyName": "Yen",
//     "languages": [
//       "ja"
//     ],
//     "name": "Japan",
//     "neighbors": [],
//     "population": 126529100,
//     "postalCodeRegExp": "^\\d{3}-\\d{4}$",
//     "tld": ".jp",
//     "wikipedia": "Japan"
//   }
// }
```

### Query for a single city by name

```javascript
const city = WorldCities.getByName('Tokyo');
```

### Query all cities matching a name

```javascript
const cities = WorldCities.getByName('nEw yOrK');
assert.equal(cities.length, 3);
```

### Timezones

The city data includes the IANA timezone ID in string format; ie. "America/Los_Angeles". To use these to localize dates and times to the city, it's highly recommended to use the [Moment Timezone library](https://momentjs.com/timezone/).

For example, to convert a UNIX timestamp to a localized date time string:

```javascript
const moment = require('moment-timezone');

moment(Math.floor(Date.now() / 1000), 'X')
  .tz('America/Los_Angeles')
  .format('dddd, MMMM Do YYYY, h:mm:ss a z');

// "Friday, May 1st 2020, 5:52:11 am PDT"
```

### GeoJSON

GeoJSON objects can be visualized nicely in the [http://geojson.io/](http://geojson.io/) UI.

Google Maps also supports using [GeoJSON as a "Data Layer"](https://developers.google.com/maps/documentation/javascript/datalayer) via the API.

### SQLite

All of the data is also available in a compact SQLite file.

```javascript
const sqlite = require('sqlite3')
const WorldCities = require('worldcities');

const db = new sqlite.Database(WorldCities.getSqlitePath());
db.run(`SELECT *
  FROM cities
  LEFT JOIN countries ON cities.country_code = countries.country_code
  WHERE cities.name = 'London'
  AND cities.country_code = 'GB'`);
```

## Data Sources

City and country data:

[GeoNames](https://download.geonames.org/export/dump/)

Flag SVG data

[flag-icon-css](https://github.com/lipis/flag-icon-css)
