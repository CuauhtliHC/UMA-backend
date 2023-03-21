const supertest = require('supertest');
const { dbClose, dbConection } = require('../../database/conectBD');
const { server, puertoOpen } = require('../../index');
const { User } = require('../../models');

const { app, usersPath, loginPath } = server;
const api = supertest(app);

const fakeUsers = [
  {
    name: 'Juan Perez',
    email: 'juanperez@mail.com',
    password: 'secreto123.',
  },
  {
    name: 'Maria Garcia',
    email: 'mariagarcia@mail.com',
    password: 'secreto123.',
  },
  {
    name: 'Armando Banquito',
    email: 'armandobanquito@mail.com',
    password: 'secreto123.',
  },
];
beforeAll(async () => {
  await dbConection();
});
beforeEach(async () => {
  await User.sync({ force: true });
  fakeUsers.forEach(async (user) => {
    await User.create(user);
  });
});

describe('User - Get by Id', () => {
  test('Devuelve error en caso de no pasar un id int', async () => {
    await api
      .get(`${usersPath}/getUserById/f`)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Devuelve error en caso de que no exista el id', async () => {
    const response = await api
      .get(`${usersPath}/getUserById/1653`)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('errors');
  });

  test('Devuelve la info del usuario con id 1', async () => {
    const response = await api.get(`${usersPath}/getUserById/1`).expect(200);
    expect(response.body.user.name).toBe(fakeUsers[0].name);
  });
});

afterAll(async () => {
  server.serverListen.close();
  await dbClose();
});
