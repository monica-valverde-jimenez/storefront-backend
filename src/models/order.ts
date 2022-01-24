import Client from '../database';

export type Order = {
  id?: Number;
  userId: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get orders ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, category_status) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [order.userId, order.status]);
      const data = result.rows[0];
      conn.release();

      return data;
    } catch (err) {      
      throw new Error(
        `Could not create with User id ${order.userId}. Error: ${err}`
      );
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const sql = 'UPDATE orders set category_status=($1) WHERE id=($2)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [order.status, order.id]);
      const data = result.rows[0] || order;
      conn.release();

      return data;
    } catch (err) {
      throw new Error(`Could not update order ${order.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<{ id: number }> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const data = result.rows[0];
      conn.release();

      return {
        id,
        ...data
      };
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
