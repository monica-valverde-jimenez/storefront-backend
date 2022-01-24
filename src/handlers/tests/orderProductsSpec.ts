import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../../server';
import { OrderProductStore } from '../../models/orderProduct';

const request = supertest(app);

dotenv.config();

const TOKEN = process.env.TOKEN_FOR_TESTING;

describe('Test order products endpoint', () => {
  it('get products list by order id endpoint', async (done) => {
    const response = await request
      .get('/orders/products/1')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Create a product in an order endpoint', async (done) => {
    spyOn(OrderProductStore.prototype, 'addNewProduct').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .post('/orders/product')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Delete a product from an order endpoint', async (done) => {
    spyOn(OrderProductStore.prototype, 'deleteOrderProduct').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .delete('/orders/product')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });
});
