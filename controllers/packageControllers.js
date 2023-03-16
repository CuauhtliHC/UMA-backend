const { response, request } = require('express');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { buildObject } = require('../helpers/buildObject');
const {
  getAllPackagesFromDb,
  getAllPackagesTodayFromDb,
  getIdPackagesFromDb,
  postPackagesFromDb,
  putPackagesFromDb,
} = require('../services/packageRequests');

dayjs.extend(utc);

const getPackageAll = async (req = request, res = response) => {
  try {
    const datePackage = await getAllPackagesFromDb();
    res.status(200).json({
      msg: 'All Package',
      total: datePackage.length,
      datePackage,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error - All Package',
      error,
    });
  }
};
const getPackageToday = async (req = request, res = response) => {
  const dateInicio = dayjs().startOf('day').toDate();
  const dateFin = dayjs().endOf('day').toDate();
  try {
    const datePackageToday = await getAllPackagesTodayFromDb(
      dateInicio,
      dateFin,
    );
    res.status(200).json({
      msg: 'All Package',
      total: datePackageToday.length,
      datePackageToday,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error - All Package',
      error,
    });
  }
};

const getPackageId = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const PackageId = await getIdPackagesFromDb(id);
    if (!PackageId) {
      return res.status(404).json({ msg: `Package-Id: ${id} - not found` });
    }
    res.status(200).json({
      msg: `Package ${id}`,
      PackageId,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error - ${id} Package`,
      error,
    });
  }
};
const postPackage = async (req = request, res = response) => {
  const data = req.body;
  data.dateOfDelivery = dayjs(data.dateOfDelivery).utc().format();
  try {
    const date = await postPackagesFromDb(data);
    res.status(201).json({
      msg: 'Creade Package',
      date,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error - Package Created',
      error,
    });
  }
};
const putPackage = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  const dato = buildObject(body);

  const packageInfo = await getIdPackagesFromDb(id);
  if (!packageInfo) {
    return res.status(404).json({ msg: `Package-Id: ${id} - not found` });
  }
  try {
    const packageId = await putPackagesFromDb(packageInfo, dato);
    res.status(200).json({ msg: 'Package-Put', packageId });
  } catch (error) {
    res.status(500).json({
      msg: 'Error Package',
      error,
    });
  }
};
const deletePackage = async (req = request, res = response) => {
  const { id } = req.params;
  const packageInfo = await getIdPackagesFromDb(id);
  if (!packageInfo) {
    return res.status(404).json({ msg: `Package-Id: ${id} - not found` });
  }
  try {
    const packageId = await putPackagesFromDb(packageInfo, { deleted: true });
    res.status(200).json({ msg: 'Package-Delete', packageId });
  } catch (error) {
    res.status(500).json({
      msg: 'Error Package',
      error,
    });
  }
};

module.exports = {
  getPackageAll,
  getPackageToday,
  getPackageId,
  postPackage,
  putPackage,
  deletePackage,
};
