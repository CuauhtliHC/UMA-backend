const supertest = require('supertest');
const Sequelize = require('../database/database');
const { server, puertoOpen } = require('../index');

const { app, PackagePath } = server;

const api = supertest(app);

test('should first', async () => {
  const prueb = await api.get(`${PackagePath}/`);
  expect(prueb.status).toBe(401);
  expect(prueb.body).toBe({});
});

afterAll(() => {
  puertoOpen.close();
  Sequelize.close();
});
