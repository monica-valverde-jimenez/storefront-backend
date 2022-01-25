import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../../server';
import { CategoryStore } from '../../models/category';

const request = supertest(app);
dotenv.config();
const TOKEN = process.env.TOKEN_FOR_TESTING;

describe('Test categories endpoint', () => {
  it('get categories list endpoint', async (done) => {
    const response = await request.get('/categories');
    expect(response.status).toBe(200);
    done();
  });

  it('get category by ID endpoint', async (done) => {
    const response = await request.get('/categories/1');
    expect(response.status).toBe(200);
    done();
  });

  it('Create a category endpoint', async (done) => {
    spyOn(CategoryStore.prototype, 'create').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request.post('/categories')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Update a category endpoint', async (done) => {
    spyOn(CategoryStore.prototype, 'update').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request.put('/categories')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Delete a category endpoint', async (done) => {
    spyOn(CategoryStore.prototype, 'delete').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request.delete('/categories')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });
});
