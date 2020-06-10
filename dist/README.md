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
const city = WorldCities.getNearestCity(5.42282298420212, 100.33753796627954);

// City {
//   latitude: 5.41123,
//   longitude: 100.33543,
//   name: 'George Town',
//   population: 300000,
//   timezone: 'Asia/Kuala_Lumpur',
//   country: Country {
//     areaSquareMeters: 329750,
//     callingCode: '60',
//     capital: 'Kuala Lumpur',
//     continent: 'AS',
//     countryCode: 'MY',
//     countryCode3: 'MYS',
//     currencyCode: 'MYR',
//     currencyName: 'Ringgit',
//     languages: [
//       'ms-MY', 'en',
//       'zh',    'ta',
//       'te',    'ml',
//       'pa',    'th'
//     ],
//     name: 'Malaysia',
//     neighbors: [ 'BN', 'TH', 'ID' ],
//     population: 31528585,
//     postalCodeRegExp: '^(\\d{5})$',
//     tld: '.my',
//     wikipedia: 'Malaysia',
//     geoJSON: undefined,
//     flagSVG: undefined
//   }
// }
```

### Query for a large city by GPS

```javascript
const WorldCities = require('worldcities');
const city = WorldCities.getNearestLargeCity(17.076480407330514, -101.3674415353851);
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

### Get a Country by Country Code

Retrieve the country data by querying for it by the 2 letter country code.
The second argument returns the Country with full data, including geoJSON
and flag SVG.

```javascript
const country = WorldCities.getCountry('NZ', true);
fs.writeFileSync('nz.flag.svg', country.flagSVG);
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

All of the data is also available in a compact SQLite file. It is in the source repository, but not included in the package to keep size reasonable.

[https://raw.githubusercontent.com/OpenDataFormats/worldcities/master/data/worldcities.sqlite]

## Data Sources

City and country data:

[GeoNames](https://download.geonames.org/export/dump/)

Flag SVG data

[flag-icon-css](https://github.com/lipis/flag-icon-css)
