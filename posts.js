const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '',
  database: 'posts',
  allowExitOnIdle: true
});

const agregarPost = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts (titulo, url, descripcion) VALUES ($1, $2, $3)";
  const values = [titulo, url, descripcion];
  const result = await pool.query(consulta, values);
  console.log("Post agregado");
};


const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};

obtenerPosts();

module.exports = { agregarPost, obtenerPosts };