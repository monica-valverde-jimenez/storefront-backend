// @ts-nocheck
import { OrderProductStore } from '../orderProduct';
import { OrderStore } from '../order';
import { UserStore } from '../user';
import { ProductStore } from '../product';

const store = new OrderProductStore();
const orderStore = new OrderStore();
const usrStore = new UserStore();
const productStore = new ProductStore();

describe('Order Product Model', () => {
  let orderId = null;
  let productId = null;

  beforeAll(async () => {
    const resUsr = await usrStore.create({
      firstName: 'Firstname test',
      lastName: 'Lastname test',
      username: 'usernameTest',
      password: 'test123'
    });
    const resOrder = await orderStore.create({
      userId: resUsr.id,
      status: 'active'
    });
    orderId = resOrder.id;
    const resProduct = await productStore.create({
      name: 'Product test',
      price: '10.00'
    });
    productId = resProduct.id;
  });

  it('should have an addProduct method', () => {
    expect(store.addNewProduct).toBeDefined();
  });

  it('should have a removeProduct method', () => {
    expect(store.deleteOrderProduct).toBeDefined();
  });

  it('should have a deleteAllOrderProduct method', () => {
    expect(store.deleteAllOrderProduct).toBeDefined();
  });

  it('should have a showOrderProduct method', () => {
    expect(store.showOrderProduct).toBeDefined();
  });

  it('addProduct method should add a new product in the order', async () => {
    const result = await store.addNewProduct({
      orderId: orderId,
      productId: productId,
      quantity: 2
    });
    expect(result.product_id).toEqual(productId);
  });

  it('deleteOrderProduct method should delete a product from an order', async () => {
    const result = await store.deleteOrderProduct(orderId, productId);
    expect(result.orderId).toEqual(orderId);
  });
});
