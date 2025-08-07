const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./swaply.db');

db.run("ALTER TABLE messages ADD COLUMN object_id INTEGER;", (err) => {
  if (err) {
    if (err.message.includes('duplicate column name')) {
      console.log("Coloana object_id există deja.");
    } else {
      console.error("Eroare la adăugare coloană:", err.message);
    }
  } else {
    console.log("Coloana object_id a fost adăugată în tabela messages.");
  }
  db.close();
});
