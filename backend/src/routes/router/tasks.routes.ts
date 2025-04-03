import express from 'express';
import { getAllTasks, createTask, deleteTasks,updateTaskStatus } from '../controller/tasks.controller';


const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);          // ✅ Add todo
router.delete('/tasks/:id', deleteTasks);     // ❌ Delete todo
router.put('/tasks/:id/status', updateTaskStatus); // 🔁 Update status
// router.post('/hello', helloRoute);

export default router;
