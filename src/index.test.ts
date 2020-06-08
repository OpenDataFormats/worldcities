/// <reference types="jest" />
import WorldCities from './index';


test('getSqliteFile returns a valid file path', () => {
  const filepath = WorldCities.getSqliteFile();

  expect(filepath.substring(filepath.lastIndexOf('.'))).toBe('.sqlite');
});
