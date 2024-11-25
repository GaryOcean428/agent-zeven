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

async function seed() {
  try {
    thoughtLogger.log('plan', 'Starting database seeding');

    // Create test user
    const [userId] = await db('users').insert({
      email: 'test@example.com',
      created_at: new Date(),
      updated_at: new Date()
    }).returning('id');

    // Create test messages
    await db('messages').insert([
      {
        user_id: userId,
        content: 'Hello, Gary8!',
        role: 'user',
        created_at: new Date()
      },
      {
        user_id: userId,
        content: 'Hi! How can I help you today?',
        role: 'assistant',
        created_at: new Date()
      }
    ]);

    thoughtLogger.log('success', 'Database seeding completed');
  } catch (error) {
    thoughtLogger.log('error', 'Seeding failed', { error });
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

seed();