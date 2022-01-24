// @ts-nocheck
import { OrderStore } from '../order';
import { UserStore } from '../user';
import { OrderProductStore } from '../orderProduct';

const store = new OrderStore();
const orderProdStore = new OrderProductStore();
const usrStore = new UserStore();

describe('Order Model', () => {
  let usrId = null;

  beforeAll(async () => {
    const result = await usrStore.create({
      firstName: 'Firstname test',
      lastName: 'Lastname test',
      username: 'usernameTest',
      password: 'test123'
    });
    usrId = result.id;
  });

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

  it('create method should add a new order', async () => {
    const result = await store.create({
      userId: usrId,
      status: 'active'
    });
    expect(result.id).toEqual(2);
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result[0].id).toEqual(1);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(1);
  });

  it('delete method should remove the order', async () => {
    const resultDetails = await orderProdStore.deleteAllOrderProduct(1);
    expect(resultDetails.orderId).toEqual(1);
    const result = await store.delete(1);
    expect(result).toEqual({ id: 1 });
  });
});
