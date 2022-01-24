import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_DATABASE_TEST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV_NODE
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: ENV_NODE === 'dev' ? POSTGRES_DATABASE : POSTGRES_DATABASE_TEST,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT)
});

export default client;
