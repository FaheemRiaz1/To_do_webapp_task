import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/router/tasks.routes'; // ✅ correct path

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // ✅ Important

app.use('/', tasksRoutes); // ✅ This is what connects your /tasks

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;