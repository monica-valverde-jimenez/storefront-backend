import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../../server';

const request = supertest(app);

dotenv.config();

const TOKEN = process.env.TOKEN_FOR_TESTING;

describe('Test services endpoint', () => {
  it('get products by category id endpoint', async (done) => {
    const response = await request.get('/products/list/product/1');
    expect(response.status).toBe(200);
    done();
  });

  it('get products top five endpoint', async (done) => {
    const response = await request.get('/products/list/popular/active');
    expect(response.status).toBe(200);
    done();
  });

  it('get products by user with order complete endpoint', async (done) => {
    const response = await request
      .get('/products/list/order/complete/1')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('get products by user with order active endpoint', async (done) => {
    const response = await request
      .get('/products/list/order/active/1')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });
});
