/**
 * @fileoverview Filters to operate on the rows of the datasets to "correct" the data,
 * after they have been run through the parser.
 */
let bucharest = new Array(7);
bucharest[6] = [];


const city = (row) => {
  // Bucharest, Romania
  if (row[3] === 'RO') {
    if (row[2] === 'Bucharest') {
      bucharest = row.concat([bucharest[6]]);
      return;
    }

    if (row[2].match(/^Sector \d{1}$/)) {
      bucharest[6].push([
        row[2],
        row[4],
      ]);
      return;
    }
  }

  return row;
};


/**
 * Return the rows created by aggregating other rows over the whole data set.
 */
const cityFlush = () => {
  return [bucharest];
};


module.exports = {
  city,
  cityFlush,
};
