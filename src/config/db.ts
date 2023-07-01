import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Загрузка переменных окружения из файла .env

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'postgres',
  password: process.env.DB_PASSWORD || '1121',
  port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool;
