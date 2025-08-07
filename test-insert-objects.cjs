const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./swaply.db');

db.serialize(() => {
  // Insert
  db.run(
    "INSERT INTO objects (user_id, title, description, category) VALUES (?, ?, ?, ?)",
    [1, "Carte", "O carte interesantă", "carti"],
    function (err) {
      if (err) return console.error("Eroare la insert obiect:", err.message);
      console.log("Obiect adăugat cu id:", this.lastID);

      // Select
      db.all("SELECT * FROM objects", (err, rows) => {
        if (err) return console.error("Eroare la select obiecte:", err.message);
        console.log("Obiecte găsite:", rows);
        db.close();
      });
    }
  );
});
