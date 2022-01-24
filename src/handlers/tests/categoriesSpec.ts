import supertest from 'supertest';
import { app } from '../../server';
import { CategoryStore } from '../../models/category';

const request = supertest(app);

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
    const response = await request.post('/categories');
    expect(response.status).toBe(200);
    done();
  });

  it('Update a category endpoint', async (done) => {
    spyOn(CategoryStore.prototype, 'update').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request.put('/categories');
    expect(response.status).toBe(200);
    done();
  });

  it('Delete a category endpoint', async (done) => {
    spyOn(CategoryStore.prototype, 'delete').and.returnValue(
      // @ts-ignore
      Promise.resolve({})
    );
    const response = await request.delete('/categories');
    expect(response.status).toBe(200);
    done();
  });
});
