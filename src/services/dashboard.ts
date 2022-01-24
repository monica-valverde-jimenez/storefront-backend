import Client from '../database';

export class DashboardQueries {
  // Get products by category
  async ordersByUser(
    userId: string,
    orderStatus: string
  ): Promise<
    { firstName: string; lastName: string; orderId: string; status: string }[]
  > {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT users.first_name, users.last_name, orders.id, orders.category_status FROM orders INNER JOIN users ON users.id = orders.user_id WHERE users.id=$1 and orders.category_status=$2 ORDER BY 1';
      const result = await conn.query(sql, [userId, orderStatus]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by categories: ${err}`);
    }
  }

  // Get products by category
  async productsByCategory(
    categoryId: string
  ): Promise<
    { categoryName: string; productName: string; productId: string }[]
  > {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT cat.name categoryName, prod.name, prod.id FROM products prod LEFT JOIN categories cat ON cat.id =  prod.category_id WHERE cat.id=$1 ORDER BY 1';
      const result = await conn.query(sql, [categoryId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by categories: ${err}`);
    }
  }

  // Get top five popular products
  async getTopFiveProducts(
    status: string
  ): Promise<{ total: number; name: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT count(*) total, products.name FROM order_products INNER JOIN orders ON orders.id = order_products.order_id INNER JOIN products ON products.id = order_products.product_id WHERE orders.category_status = $1 GROUP BY order_products.product_id, products.name ORDER BY 1 DESC LIMIT 5';
      const result = await conn.query(sql, [status]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
