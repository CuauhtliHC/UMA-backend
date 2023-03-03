const buildObject = (obj) => {
  const dato = {};
  Object.keys(obj).forEach((propiedad) => {
    if (obj[propiedad]) dato[propiedad] = obj[propiedad];
  });
  //   for (const propiedad of Object.keys(obj)) {
  //   }
  return dato;
};

module.exports = { buildObject };
