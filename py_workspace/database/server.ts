import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = 3001;

app.use(cors());

// Configura y abre conexión a la base de datos SQLite
async function getDbConnection() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
}

// Ruta para obtener datos
app.get('/api/datos', async (req, res) => {
  const db = await getDbConnection();
  const rows = await db.all('SELECT * FROM tu_tabla'); // Reemplaza "tu_tabla" con el nombre real
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
