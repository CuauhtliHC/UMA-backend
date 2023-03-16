const supertest = require('supertest');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const Sequelize = require('../../database/database');
const { server, puertoOpen } = require('../../index');
const { Package } = require('../../models');

dayjs.extend(utc);

const { app, packagePath, loginPath } = server;
const api = supertest(app);

const initPackagesToday = 2;
const initPackages = [
  {
    address: 'cordoba 1250 1640',
    addresses: 'Pedro',
    weight: 12,
    dateOfDelivery: dayjs('2023/05/20').utc().format(),
    quantityOfPackages: 3,
  },
  {
    address: 'cordoba 1000 1640',
    addresses: 'Pedro',
    weight: 12,
    dateOfDelivery: dayjs('2023/04/20').utc().format(),
    quantityOfPackages: 3,
  },
  {
    address: 'cordoba 2000 1640',
    addresses: 'Pedro',
    weight: 12,
    dateOfDelivery: dayjs('2023/03/20').utc().format(),
    quantityOfPackages: 3,
  },
  {
    address: 'cordoba 2000 1640',
    addresses: 'Pedro',
    weight: 12,
    dateOfDelivery: dayjs().utc().format(),
    quantityOfPackages: 3,
  },
  {
    address: 'cordoba 2000 1640',
    addresses: 'Pedro',
    weight: 12,
    dateOfDelivery: dayjs().utc().format(),
    quantityOfPackages: 3,
  },
];
let cookieAdmin;
let cookieUser;

beforeEach(async () => {
  await Package.sync({ force: true });
  initPackages.forEach(async (initPackage) => {
    await Package.create(initPackage);
  });
  const userAdmin = {
    email: 'admin@admin.com',
    password: 'adminUma.',
  };
  const user = {
    email: 'test@test.com',
    password: 'testUma.',
  };
  cookieAdmin = await api.post(`${loginPath}/`).send(userAdmin);
  cookieUser = await api.post(`${loginPath}/`).send(user);
});

describe('Package - GET', () => {
  test('Error en caso de no estar loguiado', async () => {
    const prueb = await api.get(`${packagePath}/`);
    expect(prueb.status).toBe(401);
  });
  test('devuelve dato si esta loguiado', async () => {
    const prueb = await api
      .get(`${packagePath}/`)
      .set('Cookie', cookieAdmin.headers['set-cookie']);
    expect(prueb.status).toBe(200);
    expect(prueb.body.total).toBe(initPackages.length);
  });
  test('devuelve dato del dia de hoy', async () => {
    const prueb = await api
      .get(`${packagePath}/today`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(prueb.body.total).toBe(initPackagesToday);
  });
  test('devuelve un el packate con el id correspondiente', async () => {
    const prueb = await api
      .get(`${packagePath}/1`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(prueb.body.PackageId.id).toBe(1);
  });
  test('devuelve error si no se paso el id como INT', async () => {
    await api
      .get(`${packagePath}/f`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Package - POST', () => {
  test('Se crea un nuevo Package', async () => {
    const newPackage = {
      address: 'cordoba 2000 1640',
      addresses: 'Pedro',
      weight: 12,
      dateOfDelivery: dayjs('2023/03/20').utc().format(),
      quantityOfPackages: 3,
    };
    await api
      .post(`${packagePath}/`)
      .send(newPackage)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const packages = await Package.findAll();
    const packagesJson = packages.map((packageData) => packageData.toJSON());
    expect(packagesJson).toHaveLength(initPackages.length + 1);
  });
  test('No se crea un nuevo Package si faltan datos', async () => {
    const newPackageList = [
      {
        addresses: 'Pedro',
        weight: 12,
        dateOfDelivery: dayjs('2023/03/20').utc().format(),
        quantityOfPackages: 3,
      },
      {
        address: 'cordoba 2000 1640',
        weight: 12,
        dateOfDelivery: dayjs('2023/03/20').utc().format(),
        quantityOfPackages: 3,
      },
      {
        address: 'cordoba 2000 1640',
        addresses: 'Pedro',
        dateOfDelivery: dayjs('2023/03/20').utc().format(),
        quantityOfPackages: 3,
      },
      {
        address: 'cordoba 2000 1640',
        addresses: 'Pedro',
        weight: 12,
        quantityOfPackages: 3,
      },
      {
        address: 'cordoba 2000 1640',
        addresses: 'Pedro',
        weight: 12,
        dateOfDelivery: dayjs('2023/03/20').utc().format(),
      },
    ];
    newPackageList.forEach(async (newPackage) => {
      await api
        .post(`${packagePath}/`)
        .send(newPackage)
        .set('Cookie', cookieAdmin.headers['set-cookie'])
        .expect('Content-Type', /application\/json/);
    });
    const packages = await Package.findAll();
    const packagesJson = packages.map((packageData) => packageData.toJSON());
    expect(packagesJson).toHaveLength(initPackages.length);
  });

  test('No se crea nuevo Package con dato erroneos', async () => {
    const newPackageList = [
      {
        address: 'cordoba 2000 1640',
        addresses: 'Pedro',
        weight: '12',
        dateOfDelivery: dayjs('2023/03/20').utc().format(),
        quantityOfPackages: 3,
      },
      {
        address: 'cordoba 2000 1640',
        addresses: 'Pedro',
        weight: 12,
        dateOfDelivery: dayjs('2023/03/20').utc().format(),
        quantityOfPackages: '3',
      },
    ];
    newPackageList.forEach(async (newPackage) => {
      const testPackage = await api
        .post(`${packagePath}/`)
        .send(newPackage)
        .set('Cookie', cookieAdmin.headers['set-cookie'])
        .expect('Content-Type', /application\/json/);

      expect(testPackage.status).toBe(400);
      expect(testPackage.body).toHaveProperty('errors');
    });
    const packages = await Package.findAll();
    const packagesJson = packages.map((packageData) => packageData.toJSON());
    expect(packagesJson).toHaveLength(initPackages.length);
  });
  test('No se crea un nuevo Package con fecha de entrega hoy', async () => {
    const newPackage = {
      address: 'cordoba 2000 1640',
      addresses: 'Pedro',
      weight: 12,
      dateOfDelivery: dayjs().utc().format(),
      quantityOfPackages: 3,
    };
    const testPackage = await api
      .post(`${packagePath}/`)
      .send(newPackage)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const packages = await Package.findAll();
    const packagesJson = packages.map((packageData) => packageData.toJSON());
    expect(packagesJson).toHaveLength(initPackages.length);
    expect(testPackage.body).toHaveProperty('errors');
  });
});

describe('Package - Delete', () => {
  test('Error en caso de no estar loguiado', async () => {
    const prueb = await api.delete(`${packagePath}/1`);
    expect(prueb.status).toBe(401);
  });
  test('Error en caso de no enviar un id INT', async () => {
    const prueb = await api
      .delete(`${packagePath}/f`)
      .set('Cookie', cookieAdmin.headers['set-cookie']);
    expect(prueb.status).toBe(400);
  });
  test('Devuelve Error en caso de no ser Administrador', async () => {
    await api
      .delete(`${packagePath}/1`)
      .set('Cookie', cookieUser.headers['set-cookie'])
      .expect(401);
  });
  test('Borra el paquete', async () => {
    const id = 1;
    await api
      .delete(`${packagePath}/${id}`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const packages = await Package.findByPk(id);
    const packagesJson = packages.toJSON();
    expect(packagesJson.deleted).toBe(true);
  });
});

describe('Package - Put', () => {
  const id = 2;

  test('Error en caso de no estar loguiado', async () => {
    const prueb = await api.put(`${packagePath}/1`);
    expect(prueb.status).toBe(401);
  });
  test('Error en caso de no enviar un id INT', async () => {
    const prueb = await api
      .put(`${packagePath}/f`)
      .set('Cookie', cookieAdmin.headers['set-cookie']);
    expect(prueb.status).toBe(400);
  });
  test('Devuelve Error en caso de no ser Administrador', async () => {
    await api
      .put(`${packagePath}/${id}`)
      .set('Cookie', cookieUser.headers['set-cookie'])
      .expect(401);
  });
  test('Edita la informacion enviada', async () => {
    const packageUpdate = {
      address: 'Cordoba 1640 1640',
      addresses: 'Pedro',
      weight: 3,
      dateOfDelivery: '2023/05/23',
      quantityOfPackages: 3,
    };
    await api
      .put(`${packagePath}/${id}`)
      .send(packageUpdate)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const packages = await Package.findByPk(id);
    const packagesJson = packages.toJSON();
    expect(packagesJson.address).toBe(packageUpdate.address);
    expect(packagesJson.addresses).toBe(packageUpdate.addresses);
    expect(packagesJson.weight).toBe(packageUpdate.weight);
    expect(dayjs(packagesJson.dateOfDelivery).utc()).toStrictEqual(
      dayjs(packageUpdate.dateOfDelivery).utc(),
    );
    expect(packagesJson.quantityOfPackages).toBe(
      packageUpdate.quantityOfPackages,
    );
  });
  describe('Mal enviada la informacion y no edita', () => {
    test('Fecha', async () => {
      const packageUpdate = {
        dateOfDelivery: '2022/05/23',
      };
      await api
        .put(`${packagePath}/${id}`)
        .send(packageUpdate)
        .set('Cookie', cookieAdmin.headers['set-cookie'])
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const packages = await Package.findByPk(id);
      const packagesJson = packages.toJSON();
      expect(dayjs(packagesJson.dateOfDelivery).utc()).not.toStrictEqual(
        dayjs(packageUpdate.dateOfDelivery).utc(),
      );
    });
    test('Address', async () => {
      const packageUpdate = {
        address: 456,
        };
      await api
        .put(`${packagePath}/${id}`)
        .send(packageUpdate)
        .set('Cookie', cookieAdmin.headers['set-cookie'])
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const packages = await Package.findByPk(id);
      const packagesJson = packages.toJSON();
      expect(packagesJson.address).not.toBe(packageUpdate.address);
    });
    test('addresses', async () => {
      const packageUpdate = {
        addresses: 54,
        };
      await api
        .put(`${packagePath}/${id}`)
        .send(packageUpdate)
        .set('Cookie', cookieAdmin.headers['set-cookie'])
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const packages = await Package.findByPk(id);
      const packagesJson = packages.toJSON();
      expect(packagesJson.addresses).not.toBe(packageUpdate.addresses);
    });
    test('Weighy', async () => {
      const packageUpdate = {
        weight: -3,
        };
      await api
        .put(`${packagePath}/${id}`)
        .send(packageUpdate)
        .set('Cookie', cookieAdmin.headers['set-cookie'])
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const packages = await Package.findByPk(id);
      const packagesJson = packages.toJSON();
      expect(packagesJson.weight).not.toBe(packageUpdate.weight);
    });
    test('QuantityOfPackages', async () => {
      const packageUpdate = {
        quantityOfPackages: -3,
      };
      await api
        .put(`${packagePath}/${id}`)
        .send(packageUpdate)
        .set('Cookie', cookieAdmin.headers['set-cookie'])
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const packages = await Package.findByPk(id);
      const packagesJson = packages.toJSON();
      expect(packagesJson.quantityOfPackages).not.toBe(
        packageUpdate.quantityOfPackages,
      );
    });
  });
});

afterAll(() => {
  // puertoOpen.close();
  // Sequelize.close();
});
