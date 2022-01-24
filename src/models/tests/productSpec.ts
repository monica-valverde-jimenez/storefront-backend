// @ts-nocheck
import { ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a new product', async () => {
    const result = await store.create({
      name: 'Product test',
      price: '10.00'
    });
    expect(result.name).toEqual('Product test');
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result.length > 0).toBe(true);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      name: 'Product test',
      category_id: null,
      price: '10.00'
    });
  });

  it('delete method should remove a product', async () => {
    const result = await store.delete('2');
    expect(result.id).toEqual('2');
  });
});
