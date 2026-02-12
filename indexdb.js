import express from 'express';
import mysql from 'mysql2/promise';
import 'dotenv/config';

const app = express();

const pool = mysql.createPool({
  uri: process.env.MYSQL_PUBLIC_URL,
});

app.get('/polizas', async (req, res) => {
  const { q } = req.query;

  try {
    let query = 'SELECT * FROM POLIZAS';
    let params = [];

    if (q && q.trim() !== '') {
      query += `
        WHERE
          numero_poliza LIKE ?
          OR nombre_asegurado LIKE ?
          OR seccion LIKE ?
          OR linea LIKE ?
          OR vigencia LIKE ?
      `;
      const like = `%${q}%`;
      params = [like, like, like, like, like];
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error consultando pólizas' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
