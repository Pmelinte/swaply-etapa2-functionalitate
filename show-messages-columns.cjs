const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./swaply.db');

db.all("PRAGMA table_info(messages);", (err, rows) => {
  if (err) return console.error("Eroare:", err.message);
  console.log("Structura messages:", rows);
  db.close();
});
