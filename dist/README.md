# World Cities

24,343 world cities and 252 countries.

A convenient wrapper for the [GeoNames](https://www.geonames.org/) database of world cities data.

The data from the GeoNames tab seperated values files are parsed and normalized into a JSON object for quick lookup and distance calculations. The data for each city's country is also normalized, indexed by [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code, paired with the country's flag's SVG, [GeoJSON](https://geojson.org/) of its boundaries, and relative URL to Wikipedia page.
