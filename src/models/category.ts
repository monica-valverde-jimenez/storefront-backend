import Client from '../database';

export type Category = {
  id?: number;
  name: string;
};

export class CategoryStore {
  async index(): Promise<Category[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM categories';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get categories. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Category> {
    try {
      const sql = 'SELECT * FROM categories WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get category ${id}. Error: ${err}`);
    }
  }

  async create(category: Category): Promise<Category> {
    try {
      const sql = 'INSERT INTO categories (name) VALUES($1) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [category.name]);
      const data = result.rows[0];
      conn.release();

      return data;
    } catch (err) {
      throw new Error(`Could not add category ${category.name}. Error: ${err}`);
    }
  }

  async update(category: Category): Promise<Category> {
    try {
      const sql = 'UPDATE categories set name=($1) WHERE id=($2)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [category.name, category.id]);
      const data = result.rows[0] || category;
      conn.release();

      return data;
    } catch (err) {
      throw new Error(`Could not add category ${category.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<{ id: number }> {
    try {
      const sql = 'DELETE FROM categories WHERE id=($1)';
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
      throw new Error(`Could not delete category ${id}. Error: ${err}`);
    }
  }
}
