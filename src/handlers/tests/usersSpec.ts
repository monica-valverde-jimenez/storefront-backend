import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../../server';
import { UserStore } from '../../models/user';

const request = supertest(app);

dotenv.config();

const TOKEN = process.env.TOKEN_FOR_TESTING;

describe('Test users endpoint', () => {
  it('get user list endpoint', async (done) => {
    const response = await request
      .get('/users')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('get user by ID endpoint', async (done) => {
    const response = await request
      .get('/users/1')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Create an user endpoint', async (done) => {
    spyOn(UserStore.prototype, 'create').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .post('/users')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Update an user endpoint', async (done) => {
    spyOn(UserStore.prototype, 'update').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .put('/users')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Authenticate an user endpoint', async (done) => {
    spyOn(UserStore.prototype, 'authenticate').and.returnValue(
      // @ts-ignore
      Promise.resolve(TOKEN)
    );
    const response = await request
      .post('/users/authenticate')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });
});
