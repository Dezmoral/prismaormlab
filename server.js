import express from 'express';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Prisma ORM relations lab API' });
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use((err, _req, res, _next) => {
  return res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
