const { response } = require('express');

const quantityGreaterThanCero = (quantityOfPackages) => {
  if (quantityOfPackages < 1 || !Number.isInteger(quantityOfPackages)) {
    throw new Error('The quantity must be a whole number and greater than 0.');
  }
  return true;
};

module.exports = {
  quantityGreaterThanCero,
};
