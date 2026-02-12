import express from 'express';
import mysql from 'mysql2/promise';
import 'dotenv/config';

const app = express();

const pool = mysql.createPool({
  uri: process.env.MYSQL_PUBLIC_URL,
});

app.get('/polizas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM polizas');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error consultando polizas' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
