import express from 'express';
import { getAllTasks, createTask, deleteTasks, updateTaskStatus,searchTaskByListID } from '../controller/tasks.controller';


import { getAllToDoLists, createToDoList, deleteToDoList, updateToDoListTitle } from '../controller/lists.controller';


const router = express.Router();

router.get('/lists', getAllToDoLists);
router.post('/lists', createToDoList);          // ✅ Add todo
router.delete('/lists/:id', deleteToDoList);     // ❌ Delete todo
router.put('/lists/:id/status', updateToDoListTitle); // 🔁 Update status
// router.post('/hello', helloRoute);
router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);          // ✅ Add todo
router.delete('/tasks/:id', deleteTasks);     // ❌ Delete todo
router.put('/tasks/:id/status', updateTaskStatus); // 🔁 Update status
router.get('/lists/:listId/tasks', searchTaskByListID)

// router.post('/hello', helloRoute);

export default router;
