import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../../server';
import { ProductStore } from '../../models/product';

const request = supertest(app);

dotenv.config();

const TOKEN = process.env.TOKEN_FOR_TESTING;

describe('Test products endpoint', () => {
  it('get products list endpoint', async (done) => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    done();
  });

  it('get product by ID endpoint', async (done) => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
    done();
  });

  it('Create a product endpoint', async (done) => {
    spyOn(ProductStore.prototype, 'create').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .post('/products')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Update a product endpoint', async (done) => {
    spyOn(ProductStore.prototype, 'update').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .put('/products')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });

  it('Delete a product endpoint', async (done) => {
    spyOn(ProductStore.prototype, 'delete').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request
      .delete('/products')
      .set('authorization', 'Bearer ' + TOKEN);
    expect(response.status).toBe(200);
    done();
  });
});
