'use strict';

const obj = { prop: 42 };
Object.freeze(obj)

try {
  obj.duh = 2
} catch (e) {
  console.log('An error was thrown!', e);
}

const cloned = Object.assign({}, obj);
cloned.duh = 2;
console.log(cloned);

// console.log(process.argv);
