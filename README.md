# World Cities

_More details can be found in the README in [dist/README.md](dist/README.md)_

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
