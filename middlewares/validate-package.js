const days = require('dayjs');
const { response } = require('express');

const quantityGreaterThanCero = (quantityOfPackages) => {
  if (!quantityOfPackages) {
    return true;
  }
  if (quantityOfPackages < 1 || !Number.isInteger(quantityOfPackages)) {
    throw new Error('The quantity must be a whole number and greater than 0.');
  }
  return true;
};
const validatedDeliveryDate = (dateOfDelivery) => {
  if (!dateOfDelivery) {
    return true;
  }
  const fecha = days(dateOfDelivery);
  const hoy = days();

  if (!fecha.isValid()) {
    throw new Error('The date is not valid');
  }

  if (!fecha.isAfter(hoy, 'day')) {
    throw new Error('The date must be after the current day');
  }

  return true;
};
const validatedWeight = (weight) => {
  if (!weight) {
    return true;
  }
  if (!(typeof weight === 'number')) {
    throw new Error('The weight field must be a Float');
  }
  if (weight < 0) {
    throw new Error('The weight cannot be less than 0');
  }

  return true;
};

module.exports = {
  quantityGreaterThanCero,
  validatedDeliveryDate,
  validatedWeight,
};
