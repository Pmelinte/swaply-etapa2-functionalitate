const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./swaply.db');

db.serialize(() => {
  db.run(
    "INSERT INTO messages (from_user_id, to_user_id, object_id, content) VALUES (?, ?, ?, ?)",
    [1, 1, 1, "Salut, vreau să schimb cartea!"],
    function (err) {
      if (err) return console.error("Eroare la insert mesaj:", err.message);
      console.log("Mesaj adăugat cu id:", this.lastID);

      db.all("SELECT * FROM messages", (err, rows) => {
        if (err) return console.error("Eroare la select mesaje:", err.message);
        console.log("Mesaje găsite:", rows);
        db.close();
      });
    }
  );
});
