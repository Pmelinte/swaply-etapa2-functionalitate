const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./swaply.db');

db.serialize(() => {
  // Insert
  db.run("INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)",
    ["Test User", "test@example.com", "parola123", "Bucuresti"],
    function (err) {
      if (err) return console.error("Eroare la insert:", err.message);
      console.log("User adăugat cu id:", this.lastID);

      // Select
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) return console.error("Eroare la select:", err.message);
        console.log("Utilizatori găsiți:", rows);
        db.close();
      });
    }
  );
});
