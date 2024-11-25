import { knex } from 'knex';
import { config } from '../src/lib/config';
import { thoughtLogger } from '../src/lib/logging/thought-logger';

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.POSTGRES_SSL === 'true'
  }
});

async function migrate() {
  try {
    thoughtLogger.log('plan', 'Starting database migration');

    // Run migrations
    await db.migrate.latest();

    thoughtLogger.log('success', 'Database migration completed');
  } catch (error) {
    thoughtLogger.log('error', 'Migration failed', { error });
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

migrate();