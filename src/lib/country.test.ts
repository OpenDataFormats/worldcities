/// <reference types="jest" />
import { Country } from './country';


test('.getByCountryCode throws on non-existent country code', () => {
  expect(() => (Country.getByCountryCode('ZZ'))).toThrow();
});
