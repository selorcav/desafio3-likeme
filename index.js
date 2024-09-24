const { agregarPost, obtenerPosts, likePost, eliminarPost } = require('./posts');
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware para habilitar CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para interpretar JSON
app.use(express.json());

app.listen(5000, () => console.log("SERVIDOR ENCENDIDO"));

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor!");
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await agregarPost(titulo, url, descripcion);
    res.status(201).json({ message: "Post agregado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await likePost(id);
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await obtenerPosts();
    const postEliminar = posts.find((post) => post.id === parseInt(id));
    if (!postEliminar) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    await eliminarPost(id);
    const postsActualizados = await obtenerPosts();
    res.json(postsActualizados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});