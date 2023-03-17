const supertest = require('supertest');
const Sequelize = require('../../database/database');
const { server, puertoOpen } = require('../../index');
const { Order } = require('../../models');

const { app, ordersPath, loginPath } = server;
const api = supertest(app);

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
let cookieAdmin;
let cookieUser;

beforeEach(async () => {
  await Order.sync({ force: true });
  initOrders.forEach(async (initOrder) => {
    await Order.create(initOrder);
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
      quantity: 456,
    };

    const prueb = await api
      .post(`${ordersPath}/create/`)
      .send(newOrder)
      .set('Cookie', cookieAdmin.headers['set-cookie']);
    console.log(prueb);
    const orders = await Order.findAll();
    const ordersJSON = orders.map((orderData) => orderData.toJSON());
    expect(ordersJSON).toHaveLength(initOrders.length + 1);
  });
});

afterAll(() => {
  puertoOpen.close();
  Sequelize.close();
});
