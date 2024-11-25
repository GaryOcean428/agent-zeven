import { thoughtLogger } from '../logging/thought-logger';

export const dbConfig = {
  client: 'pg',
  connection: {
    host: import.meta.env.VITE_POSTGRES_HOST,
    port: parseInt(import.meta.env.VITE_POSTGRES_PORT || '5432'),
    user: import.meta.env.VITE_POSTGRES_USER,
    password: import.meta.env.VITE_POSTGRES_PASSWORD,
    database: import.meta.env.VITE_POSTGRES_DB,
    ssl: import.meta.env.VITE_POSTGRES_SSL === 'true'
  }
};

export const redisConfig = {
  host: import.meta.env.VITE_REDIS_HOST,
  port: parseInt(import.meta.env.VITE_REDIS_PORT || '6379'),
  password: import.meta.env.VITE_REDIS_PASSWORD,
  db: parseInt(import.meta.env.VITE_REDIS_DB || '0')
};