/**
 * @fileoverview Test the amount of memory used in loading all of the JSON.
 */
const worldcities = require('./dist/index');


const startMem = process.memoryUsage().heapUsed;


// const lat = 43.67427984458272;
// const lng = 17.378491040319226;
const lat = 12.05288;
const lng = -61.75226;

const times = [];

let nearest;

const runTest = async () => {
  for (let i = 0; i < 1e3; i++) {
    const startTime = (new Date()).getTime();
    nearest = await worldcities.getNearestCity(lat, lng);
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
