CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM posts;