const buildObject = (obj) => {
  const dato = {};
  Object.keys(obj).forEach((propiedad) => {
    if (obj[propiedad]) dato[propiedad] = obj[propiedad];
  });
  return dato;
};

module.exports = { buildObject };
