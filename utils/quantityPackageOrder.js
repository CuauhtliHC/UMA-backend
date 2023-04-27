const addingDiffQuantity = (arrayPkg) => {
  const newArray = arrayPkg.map((pkg) => {
    const {
      address,
      addresses,
      createdAt,
      dateOfDelivery,
      deleted,
      id,
      quantityInOrders,
      quantityOfPackages,
      updatedAt,
      weight,
    } = pkg;
    const quantityRest = quantityOfPackages - quantityInOrders;
    return {
      address,
      addresses,
      createdAt,
      dateOfDelivery,
      deleted,
      id,
      quantityInOrders,
      quantityOfPackages,
      quantityRest,
      updatedAt,
      weight,
    };
  }).filter((pkg) => pkg.quantityRest !== 0);
  return newArray;
};

module.exports = { addingDiffQuantity };
