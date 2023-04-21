const { Sequelize } = require('sequelize');
const Package = require('../models/package');

const getAllPackagesFromDb = async () => {
  try {
    const datePackage = await Package.findAll({
      order: ['id'],
    });
    return datePackage;
  } catch (error) {
    throw new Error('Error get all Package', error);
  }
};
const getAllPackagesTodayFromDb = async (fechaInicial, fechaFin) => {
  try {
    const datePackageToday = await Package.findAll({
      where: {
        dateOfDelivery: { [Sequelize.Op.between]: [fechaInicial, fechaFin] },
        deleted: false,
      },
    });
    return datePackageToday;
  } catch (error) {
    throw new Error('Error get Today Package', error);
  }
};
const getIdPackagesFromDb = async (id) => {
  try {
    const datePackage = await Package.findByPk(id);
    return datePackage;
  } catch (error) {
    throw new Error('Error get id Package', error);
  }
};
const postPackagesFromDb = async (data) => {
  try {
    const datePackage = await Package.create(data);
    return datePackage;
  } catch (error) {
    throw new Error('Error post Package', error);
  }
};
const putPackagesFromDb = async (packageInfo, data) => {
  try {
    const datePackage = await packageInfo.update(data, { returning: true });
    return datePackage;
  } catch (error) {
    throw new Error('Error update Package', error);
  }
};

module.exports = {
  getAllPackagesFromDb,
  getAllPackagesTodayFromDb,
  getIdPackagesFromDb,
  postPackagesFromDb,
  putPackagesFromDb,
};
