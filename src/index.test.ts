/// <reference types="jest" />
import WorldCities from './index';


test('getSqlitePath returns a valid file path', () => {
  const filepath = WorldCities.getSqlitePath();

  expect(filepath.substring(filepath.lastIndexOf('.'))).toBe('.sqlite');
});
