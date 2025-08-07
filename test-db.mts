import getDBConnection from './lib/db';

// Exemplu de interogare simplă a bazei de date
async function testDB() {
  const db = await getDBConnection();
  const users = await db.all('SELECT * FROM users');
  console.log('Toți utilizatorii din tabelul users:', users);
  await db.close();
}

testDB().catch(err => {
  console.error('A apărut o eroare:', err);
});
