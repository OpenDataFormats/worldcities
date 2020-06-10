/// <reference types="jest" />
import WorldCities from './index';


test('Methods are exported properly', () => {
  expect(typeof WorldCities.getAllByName).toBe('function');
  expect(typeof WorldCities.getByName).toBe('function');
  expect(typeof WorldCities.getCountry).toBe('function');
  expect(typeof WorldCities.getNearestCity).toBe('function');
  expect(typeof WorldCities.getNearestCountry).toBe('function');
  expect(typeof WorldCities.getNearestLargeCity).toBe('function');
});
