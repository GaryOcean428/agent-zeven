import { Pool } from 'pg';
import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';

export class PostgresClient {
  private static instance: PostgresClient;
  private pool: Pool;
  private initialized = false;

  private constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DB,
      ssl: process.env.POSTGRES_SSL === 'true',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (err) => {
      thoughtLogger.log('error', 'Unexpected database error', { error: err });
    });
  }

  static getInstance(): PostgresClient {
    if (!PostgresClient.instance) {
      PostgresClient.instance = new PostgresClient();
    }
    return PostgresClient.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Test connection
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();

      this.initialized = true;
      thoughtLogger.log('success', 'PostgreSQL connection initialized');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize PostgreSQL connection', { error });
      throw new AppError('Database initialization failed', 'DB_ERROR', error);
    }
  }

  async query<T>(
    text: string,
    params?: any[],
    options?: { singleRow?: boolean }
  ): Promise<T> {
    if (!this.initialized) {
      await this.initialize();
    }

    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;

      thoughtLogger.log('success', 'Database query executed', {
        query: text,
        duration,
        rowCount: result.rowCount
      });

      return options?.singleRow ? result.rows[0] : result.rows;
    } catch (error) {
      thoughtLogger.log('error', 'Database query failed', {
        query: text,
        error
      });
      throw new AppError('Database query failed', 'DB_ERROR', error);
    }
  }

  async transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async end(): Promise<void> {
    await this.pool.end();
    this.initialized = false;
    thoughtLogger.log('success', 'Database connection closed');
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}