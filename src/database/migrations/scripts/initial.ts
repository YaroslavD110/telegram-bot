import { db } from '../../db-client';

export async function up() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_id TEXT NOT NULL,
      full_name TEXT NOT NULL,
      chat_id TEXT NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      telegram_username TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down() {
  await db.exec('DROP TABLE IF EXISTS users;');
}
