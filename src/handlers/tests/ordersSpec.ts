import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../../server';
import { OrderStore } from '../../models/order';

const request = supertest(app);

dotenv.config();

const TOKEN = process.env.TOKEN_FOR_TESTING;

describe('Test orders endpoint', () => {
  it('get orders list endpoint', async (done) => {
    const response = await request
      .get('/orders')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('get order by id list endpoint', async (done) => {
    const response = await request
      .get('/orders/1')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Create a order endpoint', async (done) => {
    spyOn(OrderStore.prototype, 'create').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .post('/orders')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Update a order endpoint', async (done) => {
    spyOn(OrderStore.prototype, 'update').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .put('/orders')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Delete a order endpoint', async (done) => {
    spyOn(OrderStore.prototype, 'delete').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .delete('/orders')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });
});
