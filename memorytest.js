/**
 * @fileoverview Test the amount of memory used in loading all of the JSON.
 */
const WorldCities = require('./dist');


const startMem = process.memoryUsage().heapUsed;

const lat = 35.6828387;
const lng = 139.7594549;

const times = [];

let nearest;

const runTest = async () => {
  for (let i = 0; i < 1e3; i++) {
    const startTime = (new Date()).getTime();
    nearest = await WorldCities.getNearestCity(lat, lng);
    const endTime = (new Date()).getTime();
    times.push(endTime - startTime);
  }
};
runTest()
  .then(() => {

    console.log('NEAREST CITY', JSON.stringify(nearest, null, 2));

    const endMem = process.memoryUsage().heapUsed;
    const result = (endMem - startMem);
    const resultMb = Math.round((result / 1024 / 1024) * 100) / 100;

    const totalTime = times.reduce((acc, curr) => (acc + curr));

    console.log('Memory Used:', result);
    console.log(`The script uses approximately ${resultMb} MB`);
    console.log(`Average execution time: ${totalTime / times.length}ms`);

  });

console.log(WorldCities.getSqliteFile());
