import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Creează tabelele de bază (users, objects, feedback_user, feedback_object)
async function initDb(db: Database) {
  // Tabel utilizatori
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      location TEXT,
      rating REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Tabel obiecte
  await db.exec(`
    CREATE TABLE IF NOT EXISTS objects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT,
      description TEXT,
      category TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  // Tabel feedback între utilizatori
  await db.exec(`
    CREATE TABLE IF NOT EXISTS feedback_user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_user_id INTEGER NOT NULL,
      to_user_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (from_user_id) REFERENCES users(id),
      FOREIGN KEY (to_user_id) REFERENCES users(id)
    );
  `);

  // Tabel feedback la obiecte
  await db.exec(`
    CREATE TABLE IF NOT EXISTS feedback_object (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      object_id INTEGER NOT NULL,
      from_user_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (object_id) REFERENCES objects(id),
      FOREIGN KEY (from_user_id) REFERENCES users(id)
    );
  `);
}

export async function getDBConnection() {
  const db = await open({
    filename: './swaply.db',
    driver: sqlite3.Database,
  });

  await initDb(db);

  return db;
}

export default getDBConnection;
