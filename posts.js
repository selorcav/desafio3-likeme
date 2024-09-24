const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'lucy2705',
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
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
  return rows;
};

obtenerPosts();

const likePost = async (id) => {
  const consulta = "UPDATE posts SET me_gusta = NOT me_gusta WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
};

const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
};

module.exports = { agregarPost, obtenerPosts, likePost, eliminarPost };