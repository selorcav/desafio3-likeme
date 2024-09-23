const { agregarPost, obtenerPosts } = require('./posts');
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
  const posts = await obtenerPosts();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  await agregarPost(titulo, url, descripcion);
  res.status(201).json({ message: "Post agregado" });
});
