const sqlite3 = require('sqlite3').verbose();

// 1. Conectare la bază (dacă nu există, se creează automat)
const db = new sqlite3.Database('./swaply.db', (err) => {
  if (err) {
    console.error('Eroare la deschidere:', err.message);
    process.exit(1);
  }
  console.log('Conexiune reușită!');
});

// 2. Creează tabelele principale (exemplu: users, objects, messages)
db.serialize(() => {
  // USERS
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      location TEXT,
      rating REAL DEFAULT 0,
      avatar_url TEXT
    )
  `);

  // OBJECTS
  db.run(`
    CREATE TABLE IF NOT EXISTS objects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      description TEXT,
      category TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // MESSAGES
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_user_id INTEGER,
      to_user_id INTEGER,
      content TEXT,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(from_user_id) REFERENCES users(id),
      FOREIGN KEY(to_user_id) REFERENCES users(id)
    )
  `);

  // ...poți adăuga și alte tabele aici, la nevoie
});

// 3. Test: Arată lista de tabele (verificare rapidă)
db.all(`SELECT name FROM sqlite_master WHERE type='table'`, (err, rows) => {
  if (err) {
    console.error('Eroare interogare:', err.message);
    db.close();
    return;
  }
  console.log('Tabele găsite:', rows.map(r => r.name));
  db.close();
});
