# CLAUDE.md

This repo builds the [`worldcities`](https://www.npmjs.com/package/worldcities) npm package. The package looks up cities and countries by GPS coordinates or by name, using GeoNames data. The repo has two separate halves:

1. **Data pipeline** (`bin/`, `converters/`, `data/`): plain Node.js (CommonJS) scripts. They turn GeoNames TSV dumps into compact JSON under `src/data/` and into `data/worldcities.sqlite`.
2. **Library** (`src/`): TypeScript. It is compiled into `dist/`, and `dist/` is the directory that gets published to npm.

## Commands

```bash
npm run build          # copy src/data/** -> dist/data, then tsc (outDir: dist)
npx jest               # run tests locally (see note below)
npx jest src/lib/city.test.ts -t 'getNearest'   # single file / single test
npm run docs           # jsdoc -> docs/jsdocs

./bin/pull.data.sh     # download countryInfo.txt + shapes_all_low into data/
./bin/convert.all.sh   # regenerate src/data/*.json, src/data/geojson/*, data/worldcities.sqlite
```

- `npm test` runs jest and then pipes coverage into `coveralls`, which needs Coveralls credentials. For local runs, use `npx jest`. Coverage is written to `docs/coverage/`.
- The `npm run lint` setup doesn't match the code. ESLint points at `./src/`, but `.eslintrc.js` is configured for plain JS scripts (`sourceType: script`, `sort-keys` enforced), so it really only fits `converters/`. `tslint.json` exists, but no script runs it.
- Publishing: pull, convert, test, bump the version in `dist/package.json`, then run `npm publish` from inside `./dist`. The root `package.json` (`worldcities-main`) is never published.

## Data pipeline

- `data/` holds the source inputs: `cities15000.txt`, `countryInfo.txt`, `shapes_all_low.txt`, `wikipedia.json`, and the generated `worldcities.sqlite`. `data/examinedb.py` is a small helper that prints the SQLite schema.
- `pull.data.sh` does **not** download `cities15000.txt`. To refresh it, download it by hand from `https://download.geonames.org/export/dump/cities15000.zip`. `wikipedia.json` (ISO code → Wikipedia article title) is maintained by hand.
- `converters/parsers.js` maps GeoNames columns to compact positional arrays. Rows with feature code `PPLX` (city sections) are skipped. Column layout reference: <https://download.geonames.org/export/dump/readme.txt>
- `converters/cities.js` writes:
  - `src/data/cities.json` and `src/data/countries.json`
  - one GeoJSON file per country at `src/data/geojson/<cc>.json`
  - the SQLite DB, via `converters/database.js`, which also embeds the flag SVGs from `src/data/flags/`
- `converters/continents.js` reads the generated `countries.json` and writes `src/data/continents.json` (continent code → sorted country names), so it has to run after `cities.js`.
- Converters resolve paths relative to `__dirname`, so they can be run from any directory.

## Library architecture

- `src/index.ts` exports the public API, both as `module.exports` and as `export default`: `getNearestCity`, `getNearestLargeCity`, `getNearestCountry`, `getByName`, `getAllByName`, `getCountry`, `getLargestCities`, plus the `City` and `Country` classes.
- `src/lib/city.ts` and `src/lib/country.ts` are classes with static lookup methods. They do linear scans over the JSON arrays imported with `resolveJsonModule`. Distances come from the haversine formula in `src/lib/util.ts`.
- `Country.getByCountryCode(cc, full)` throws on an unknown code. With `full=true`, it also reads `../data/geojson/<cc>.json` and `../data/flags/<cc>.svg` from disk with `fs`, relative to the compiled file. That is why `build` copies `src/data` to `dist/data`.
- "Large city" means a population above 150,000 (`LARGE_CITY_POPULATION`).

## Gotchas

- **The record formats are positional arrays, and the column order is duplicated across several files.**
  - City: `[lat, lng, name, countryCode, population, timezone]`.
  - Country: `[cc, cc3, name, capital, area, population, continent, tld, currencyCode, currencyName, phone, postalRegExp, languages[], neighbors[], wikipedia]`.
  - If you change a field, update all of these together: `converters/parsers.js`, `converters/database.js` (column list, plus the `row[12]`/`row[13]` joins), `fromRawJson` in `city.ts`/`country.ts`, `src/lib/types.ts`, and `src/schemas/city.json`.
- `getByName` and `getAllByName` pass `name` directly to `new RegExp(name, 'i')`. That gives substring and regex matching with no escaping. `getByName` returns the *first* match in array order.
- The imported JSON arrays (`cities`, `countries`) are shared module state. Never sort or mutate them in place; copy first (e.g. `[...cities].sort(...)`), or `getByName`'s "first match" order will change.
- Tests check exact counts and names from the current dataset (for example, `getAllByName('lOn')` must return 122). They will break after a data refresh and need updating.
- `dist/` is git-ignored except for `dist/package.json` and `dist/README.md`. `dist/README.md` is the user-facing package README.
