/// <reference types="jest" />
import { Country } from './country';


test('.getByCountryCode throws on non-existent country code', () => {
  expect(() => (Country.getByCountryCode('ZZ'))).toThrow();
});

test('.getByCountryCode with full data, SVG and geoJSON', () => {
  const japan = Country.getByCountryCode('JP', true);

  expect(typeof japan.geoJSON).toBe('object');
  expect(typeof japan.flagSVG).toBe('string');
});
