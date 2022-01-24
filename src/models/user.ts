import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: Number;
  firstName: string;
  lastName?: string;
  password: string;
  username: string;
};

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const data = result.rows[0] || {};
      conn.release();

      return {
        firstName: data.first_name,
        lastName: data.lastt_name,
        username: data.username,
        password: data.password
      };
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS || '0')
      );
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        hash
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not creat an user ${user.firstName}. Error: ${err}`
      );
    }
  }

  async update(user: User): Promise<User> {
    try {
      const sql =
        'UPDATE users set first_name=($1), last_name=($2), username=($3), password_digest=($4) WHERE id=($5)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        user.password,
        user.id
      ]);
      const data = result.rows[0] || user;
      conn.release();

      return data;
    } catch (err) {
      throw new Error(
        `Could not add category ${user.firstName}. Error: ${err}`
      );
    }
  }

  async delete(id: number): Promise<{ id: number }> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
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
      throw new Error(`Could not delete users ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql =
      'SELECT username, password_digest FROM users WHERE username=($1)';
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)
      ) {
        return user;
      }
    }
    return null;
  }
}
