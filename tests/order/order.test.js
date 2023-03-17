const supertest = require('supertest');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const Sequelize = require('../../database/database');
const { server, puertoOpen } = require('../../index');
const { Order, Package } = require('../../models');

const { app, ordersPath, loginPath } = server;
const api = supertest(app);
dayjs.extend(utc);
const initOrders = [
  {
    quantity: 2,
  },
  {
    quantity: 3,
  },
  {
    quantity: 4,
  },
  {
    quantity: 5,
  },
];
const newPackage = {
  address: 'cordoba 2000 1640',
  addresses: 'Pedro',
  weight: 12,
  dateOfDelivery: dayjs().utc().format(),
  quantityOfPackages: 3,
};
let cookieAdmin;
let cookieUser;
let newPackageToday;

beforeEach(async () => {
  await Order.sync({ force: true });
  await Package.sync({ force: true });
  initOrders.forEach(async (initOrder) => {
    await Order.create(initOrder);
  });
  newPackageToday = await Package.create(newPackage);
  console.log('ACAAA', newPackageToday);
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

describe('orders - GET', () => {
  test('Error en caso de no estar loguiado', async () => {
    const prueb = await api.get(`${ordersPath}/`);
    expect(prueb.status).toBe(401);
  });

  test('devuelve datos si esta loguiado', async () => {
    const prueb = await api
      .get(`${ordersPath}/`)
      .set('Cookie', cookieAdmin.headers['set-cookie']);
    expect(prueb.status).toBe(200);
    expect(prueb.body.total).toBe(initOrders.length);
  });

  test('devuelve una order con el id solicitado', async () => {
    const prueb = await api
      .get(`${ordersPath}/1`)
      .set('Cookie', cookieAdmin.headers['set-cookie']);
    expect(prueb.status).toBe(200);
    expect(prueb.body.order.id).toBe(1);
  });
});

describe('orders - POST', () => {
  test('Se crea un nuevo Order', async () => {
    const newOrder = {
      quantity: 1,
      packageId: 1,
    };

    const prueb = await api
      .post(`${ordersPath}/create/`)
      .send(newOrder)
      .set('Cookie', cookieAdmin.headers['set-cookie']);
    console.log(prueb.body);
    const orders = await Order.findAll();
    const ordersJSON = orders.map((orderData) => orderData.toJSON());
    expect(ordersJSON).toHaveLength(initOrders.length + 1);
  });
});

describe('Order - Delete', () => {
  test('Error si el usuario no esta logueado', async () => {
    const prueb = await api.delete(`${ordersPath}/delete/1`);
    expect(prueb.status).toBe(401);
  });
  test('Error en caso de no enviar un id INTEGER', async () => {
    const prueb = await api
      .delete(`${ordersPath}/delete/f`)
      .set('Cookie', cookieAdmin.headers['set-cookie']);
    expect(prueb.status).toBe(400);
  });
  test('Devuelve Error en caso de no ser Administrador', async () => {
    await api
      .delete(`${ordersPath}/delete/1`)
      .set('Cookie', cookieUser.headers['set-cookie'])
      .expect(401);
  });
  // test('Borra la order', async () => {
  //   const id = 1;
  //   const order = await Order.findByPk(id);
  //   const deleteando = await api
  //     .delete(`${ordersPath}/delete/${id}`)
  //     .set('Cookie', cookieAdmin.headers['set-cookie']);
  //   console.log(order);
  //   expect(deleteando.body.deleted).toBe(true);
  // });
});
