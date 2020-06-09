# World Cities

24,343 world cities and 252 countries.

A convenient wrapper for the [GeoNames](https://www.geonames.org/) database of world cities data.

The data from the GeoNames tab seperated values files are parsed and normalized into a JSON object for quick lookup and distance calculations. The data for each city's country is also normalized, indexed by [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code, paired with the country's flag's SVG, [GeoJSON](https://geojson.org/) of its boundaries, and relative URL to Wikipedia page.

## Updating Source Data

```bash
./bin/pull.data.sh
./bin/convert.all.sh
```

## Testing

```bash
npm test
```

## Publishing

```bash
./bin/pull.data.sh
./bin/convert.all.sh
npm test
cd ./dist
npm publish
```

## Folder Structure

| Folder | Description |
| --- | --- |
| `./bin` | Shell scripts to pull and convert the datasets to update for republishing. |
| `./converters` | Scripts to convert source TSV files into JSON. |
| `./data` | Source TSV data files. |
| `./dist` | "Compiled" output for creating [the npm package](https://www.npmjs.com/package/worldcities). |
| `./dist/data` | The converted and formatted JSON. |
| `./dist/data/flags` | SVG files of the flags of each country. |
| `./dist/data/geojson` | The GeoJSON of the shape of each country. |
| `./src` | The TypeScript source and tests. |
