"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTaskByListID = exports.updateTaskStatus = exports.deleteTasks = exports.createTask = exports.getAllTasks = void 0;
const database_1 = __importDefault(require("../../database"));
// Get all tasks
const getAllTasks = (req, res) => {
    let query = 'SELECT * FROM todos';
    const listId = req.query.list_id;
    if (listId) {
        query += ' WHERE list_id = ?';
        database_1.default.query(query, [listId], (err, results) => {
            if (err) {
                console.error('Error fetching tasks for list:', err);
                return res.status(500).json({ message: 'Error retrieving tasks for specified list' });
            }
            res.status(200).json(results);
        });
    }
    else {
        database_1.default.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching tasks:', err);
                return res.status(500).json({ message: 'Error retrieving tasks' });
            }
            res.status(200).json(results);
        });
    }
};
exports.getAllTasks = getAllTasks;
// Create a new task
const createTask = (req, res) => {
    const { title, description, list_id } = req.body;
    if (!title || !list_id) {
        res.status(400).json({ message: 'Title and list ID are required' });
        return;
    }
    // Verify list_id exists
    database_1.default.query('SELECT list_id FROM lists WHERE list_id = ?', [list_id], (listErr, listResults) => {
        if (listErr || listResults.length === 0) {
            res.status(404).json({ message: 'List not found' });
            return;
        }
        const query = 'INSERT INTO todos (title, description, completed, list_id) VALUES (?, ?, false, ?)';
        database_1.default.query(query, [title, description, list_id], (err, result) => {
            if (err) {
                console.error('Error creating task:', err);
                return res.status(500).json({ message: 'Failed to create task' });
            }
            res.status(201).json({
                id: result.insertId,
                title,
                description,
                completed: false,
                list_id
            });
        });
    });
};
exports.createTask = createTask;
// Delete a task
const deleteTasks = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE id = ?';
    database_1.default.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            return res.status(500).json({ message: 'Failed to delete task' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    });
};
exports.deleteTasks = deleteTasks;
// Update a task's status
const updateTaskStatus = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Invalid completed value. Must be true or false.' });
    }
    const query = 'UPDATE todos SET completed = ? WHERE id = ?';
    database_1.default.query(query, [completed, id], (err, result) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).json({ message: 'Failed to update task status' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo status updated', completed });
    });
};
exports.updateTaskStatus = updateTaskStatus;
// Assuming you have a route setup for tasks already, add this:
const searchTaskByListID = (req, res) => {
    const { listId } = req.params;
    const query = 'SELECT * FROM todos WHERE list_id = ?';
    database_1.default.query(query, [listId], (err, tasks) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).json({ message: 'Error retrieving tasks' });
        }
        if (tasks.length > 0) {
            res.status(200).json(tasks);
        }
        else {
            res.status(404).json({ message: 'No tasks found for this list' });
        }
    });
};
exports.searchTaskByListID = searchTaskByListID;
