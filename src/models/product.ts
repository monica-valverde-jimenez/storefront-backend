import Client from '../database';

export type Product = {
  id?: number;
  category_id?: number | null;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (category_id, name, price) VALUES($1, $2, $3) RETURNING id';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product.category_id,
        product.name,
        product.price
      ]);
      const data = result.rows[0];
      conn.release();

      return {
        ...product,
        ...data
      };
    } catch (err) {
      throw new Error(`Could not add product ${product.name}. Error: ${err}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE products set category_id=($1), name=($2), price=($3) WHERE id=($4)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product.category_id,
        product.name,
        product.price,
        product.id
      ]);
      const data = result.rows[0] || product;
      conn.release();

      return data;
    } catch (err) {
      throw new Error(`Could not add category ${product.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<{ id: number }> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
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
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
