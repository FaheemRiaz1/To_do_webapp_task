"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = require("../controller/tasks.controller");
const lists_controller_1 = require("../controller/lists.controller");
const router = express_1.default.Router();
/* ==================== To-Do Lists Routes ==================== */
// Get all to-do lists
router.get('/lists', lists_controller_1.getAllToDoLists);
// Create a new to-do list
router.post('/lists', lists_controller_1.createToDoList);
// Delete a to-do list by ID
router.delete('/lists/:id', lists_controller_1.deleteToDoList);
// Update title of a to-do list by ID
router.put('/lists/:id/status', lists_controller_1.updateToDoListTitle);
// Get task statistics for a list (total & completed count)
router.get('/lists/:listId/stats', lists_controller_1.getStats);
/* ==================== Task Routes ==================== */
// Get all tasks
router.get('/tasks', tasks_controller_1.getAllTasks);
// Create a new task
router.post('/tasks', tasks_controller_1.createTask);
// Delete a task by ID
router.delete('/tasks/:id', tasks_controller_1.deleteTasks);
// Update completion status of a task by ID
router.put('/tasks/:id/status', tasks_controller_1.updateTaskStatus);
// Get tasks by specific to-do list ID
router.get('/lists/:listId/tasks', tasks_controller_1.searchTaskByListID);
/* ==================== Placeholder Routes ==================== */
// router.post('/hello', helloRoute);  // Example route for testing
exports.default = router;
