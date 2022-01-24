import Client from '../database';

export type OrderProduct = {
  id?: Number;
  orderId: Number;
  productId: Number;
  quantity: Number;
};

export class OrderProductStore {
  async addNewProduct(detail: OrderProduct): Promise<OrderProduct> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      //@ts-ignore
      const conn = await Client.connect();
      const resOrder = await conn.query(ordersql, [detail.orderId]);
      const order = resOrder.rows[0];

      if (order.category_status !== 'active') {
        throw new Error(
          `Could not add product ${detail.productId} to order ${detail.orderId} because order status is ${order.category_status}`
        );
      }
      conn.release();
    } catch (err) {
      throw new Error(`Could not add product ${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        detail.orderId,
        detail.productId,
        detail.quantity
      ]);
      const data = result.rows[0];
      conn.release();

      return data;
    } catch (err) {
      throw new Error(`Could not add product ${err}`);
    }
  }

  async showOrderProduct(orderId: string): Promise<[OrderProduct[]]> {
    try {
      const sql = 'SELECT * FROM order_products WHERE order_id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [orderId]);
      conn.release();

      return [result.rows];
    } catch (err) {
      throw new Error(`Could not delete product ${err}`);
    }
  }

  async deleteOrderProduct(
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    try {
      const sql =
        'DELETE FROM order_products WHERE product_id=($1) and order_id=($2)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [productId, orderId]);
      const data = result.rows[0];
      conn.release();

      return {
        orderId: orderId,
        productId: productId,
        ...data
      };
    } catch (err) {
      throw new Error(`Could not delete product ${err}`);
    }
  }

  async deleteAllOrderProduct(orderId: string): Promise<OrderProduct> {
    try {
      const sql = 'DELETE FROM order_products WHERE order_id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [orderId]);
      const data = result.rows[0];
      conn.release();

      return {
        orderId: orderId,
        ...data
      };
    } catch (err) {
      throw new Error(
        `Could not delete products from order ${orderId}: ${err}`
      );
    }
  }
}
