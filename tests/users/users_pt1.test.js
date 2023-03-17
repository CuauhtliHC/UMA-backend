const supertest = require('supertest');
const { server } = require('../../index');

const { dbClose } = require('../../database/conectBD');
const { User } = require('../../models');
const { creationUsers } = require('../../services/addDataBbDd');

const { app, loginPath, usersPath } = server;
const api = supertest(app);

let cookieAdmin;
let cookieUser;

beforeAll(async () => {
  await User.sync({ force: true });
  await creationUsers();
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

describe('GET /getAllUsers/:limit', () => {
  test('Devuelve Error en caso de no ser Administrador', async () => {
    const limit = 6;
    await api
      .get(`${usersPath}/getAllUsers/${limit}`)
      .set('Cookie', cookieUser.headers['set-cookie'])
      .expect(401);
  });

  test('devuelve error si no se paso el limit como INT', async () => {
    await api
      .get(`${usersPath}/getAllUsers/f`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('devuelve error si no se paso el limit mayor a 5', async () => {
    const limit = 5;
    await api
      .get(`${usersPath}/getAllUsers/${limit}`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('devuelve la lista de usuarios activos', async () => {
    const limit = 6;
    const response = await api
      .get(`${usersPath}/getAllUsers/${limit}`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.rows.length).toBeLessThanOrEqual(limit);
  });
});

describe('GET /getAllUsersBanned/:limit', () => {
  test('Devuelve Error en caso de no ser Administrador', async () => {
    const limit = 6;
    await api
      .get(`${usersPath}/getAllUsersBanned/${limit}`)
      .set('Cookie', cookieUser.headers['set-cookie'])
      .expect(401);
  });

  test('devuelve error si no se paso el limit como INT', async () => {
    await api
      .get(`${usersPath}/getAllUsersBanned/f`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('devuelve error si no se paso el limit mayor a 5', async () => {
    const limit = 5;
    await api
      .get(`${usersPath}/getAllUsersBanned/${limit}`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('devuelve la lista de usuarios baneados', async () => {
    const limit = 6;
    const response = await api
      .get(`${usersPath}/getAllUsersBanned/${limit}`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.rows.length).toBeLessThanOrEqual(limit);
  });
});

describe('POST /register', () => {
  test('devuelve error si alguno de los campos para el registro esta vacio', async () => {
    const newUsers = [
      {
        email: 'testing@uma.com',
        password: 'ASDasddas8@',
      },
      {
        name: 'Test',
        password: 'ASDasddas8@',
      },
      {
        name: 'Test',
        email: 'testing@uma.com',
      },
    ];
    newUsers.forEach(async (newUser) => {
      await api
        .post(`${usersPath}/register`)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });

  test('devuelve error si el email no es valido', async () => {
    const newUser = {
      name: 'Test',
      email: 'testing',
      password: 'ASDasddas8@',
    };
    await api
      .post(`${usersPath}/register`)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('devuelve error si el password no es valido', async () => {
    const newUsers = [
      {
        name: 'Test',
        email: 'testing@uma.com',
        password: '5',
      },
      {
        name: 'Test',
        email: 'testing@uma.com',
        password: 'P5',
      },
      {
        name: 'Test',
        email: 'testing@uma.com',
        password: 'Pl5',
      },
      {
        name: 'Test',
        email: 'testing@uma.com',
        password: 'Pl5@',
      },
    ];
    newUsers.forEach(async (newUser) => {
      await api
        .post(`${usersPath}/register`)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });

  test('Devuelve error si el email ya esta en uso', async () => {
    const newUser = {
      name: 'Test',
      email: 'admin@admin.com',
      password: 'Plataforma5@',
    };
    await api
      .post(`${usersPath}/register`)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Registro correcto', async () => {
    const newUser = {
      name: 'Test',
      email: 'testing1@uma.com',
      password: 'Plataforma5@',
    };
    await api
      .post(`${usersPath}/register`)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
});

describe('PUT /updateUser/:id', () => {
  test('Devuelve error si el id no es valido', async () => {
    const updateUser = {
      name: 'Test',
      email: 'testing',
      password: 'ASDasddas8@',
    };
    await api
      .put(`${usersPath}/updateUser/f`)
      .send(updateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Devuelve error si el id no existe', async () => {
    const updateUser = {
      name: 'Test',
      email: 'testing',
      password: 'ASDasddas8@',
    };
    await api
      .put(`${usersPath}/updateUser/10`)
      .send(updateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('devuelve error si alguno de los campos para el update esta vacio', async () => {
    const updateUser = {
      email: 'testing@uma.com',
      password: 'ASDasddas8@',
    };
    await api
      .put(`${usersPath}/updateUser/2`)
      .send(updateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('devuelve error si el email no es valido', async () => {
    const updateUser = {
      name: 'Test',
      email: 'test',
      password: 'adminUma.',
    };
    await api
      .put(`${usersPath}/updateUser/2`)
      .send(updateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Update correcto', async () => {
    const newUser = {
      name: 'Test',
      email: 'testing@uma.com',
      password: 'Plataforma5@',
    };
    await api
      .put(`${usersPath}/updateUser/2`)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
});

describe('PUT /disableUser/:id', () => {
  test('Devuelve Error en caso de no ser Administrador', async () => {
    await api
      .put(`${usersPath}/disableUser/1`)
      .set('Cookie', cookieUser.headers['set-cookie'])
      .expect(401);
  });

  test('Devuelve error si el id no existe', async () => {
    await api
      .put(`${usersPath}/disableUser/10`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Realiza el cambio de baneado correctamente', async () => {
    await api
      .put(`${usersPath}/disableUser/2`)
      .set('Cookie', cookieAdmin.headers['set-cookie'])
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  server.serverListen.close();
  // dbClose();
});
