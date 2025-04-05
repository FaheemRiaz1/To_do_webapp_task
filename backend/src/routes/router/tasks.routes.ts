import express from 'express';
import {
  getAllTasks,
  createTask,
  deleteTasks,
  updateTaskStatus,
  searchTaskByListID
} from '../controller/tasks.controller';

import {
  getAllToDoLists,
  createToDoList,
  deleteToDoList,
  updateToDoListTitle,
  getStats
} from '../controller/lists.controller';

const router = express.Router();

/* ==================== To-Do Lists Routes ==================== */

// Get all to-do lists
router.get('/lists', getAllToDoLists);

// Create a new to-do list
router.post('/lists', createToDoList);

// Delete a to-do list by ID
router.delete('/lists/:id', deleteToDoList);

// Update title of a to-do list by ID
router.put('/lists/:id/status', updateToDoListTitle);

// Get task statistics for a list (total & completed count)
router.get('/lists/:listId/stats', getStats);


/* ==================== Task Routes ==================== */

// Get all tasks
router.get('/tasks', getAllTasks);

// Create a new task
router.post('/tasks', createTask);

// Delete a task by ID
router.delete('/tasks/:id', deleteTasks);

// Update completion status of a task by ID
router.put('/tasks/:id/status', updateTaskStatus);

// Get tasks by specific to-do list ID
router.get('/lists/:listId/tasks', searchTaskByListID);


/* ==================== Placeholder Routes ==================== */

// router.post('/hello', helloRoute);  // Example route for testing

export default router;
