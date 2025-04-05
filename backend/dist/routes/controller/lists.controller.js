"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.updateToDoListTitle = exports.deleteToDoList = exports.createToDoList = exports.getAllToDoLists = void 0;
const database_1 = __importDefault(require("../../database"));
// Get all to-do lists
const getAllToDoLists = (req, res) => {
    database_1.default.query('SELECT * FROM lists', (err, results) => {
        if (err) {
            console.error('Error fetching to-do lists:', err);
            return res.status(500).json({ message: 'Error retrieving to-do lists' });
        }
        res.status(200).json(results);
    });
};
exports.getAllToDoLists = getAllToDoLists;
// Create a new to-do list
const createToDoList = (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ message: 'Title is required' });
        return;
    }
    const query = 'INSERT INTO lists (title) VALUES (?)';
    database_1.default.query(query, [title], (err, result) => {
        if (err) {
            console.error('Error creating to-do list:', err);
            return res.status(500).json({ message: 'Failed to create to-do list' });
        }
        res.status(201).json({
            id: result.insertId,
            title
        });
    });
};
exports.createToDoList = createToDoList;
// Delete a to-do list
const deleteToDoList = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM lists WHERE list_id = ?';
    database_1.default.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting to-do list:', err);
            return res.status(500).json({ message: 'Failed to delete to-do list' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'To-do list not found' });
        }
        res.status(200).json({ message: 'To-do list deleted successfully' });
    });
};
exports.deleteToDoList = deleteToDoList;
// Update a to-do list's title
const updateToDoListTitle = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const query = 'UPDATE lists SET title = ? WHERE list_id = ?';
    database_1.default.query(query, [title, id], (err, result) => {
        if (err) {
            console.error('Error updating to-do list:', err);
            return res.status(500).json({ message: 'Failed to update to-do list' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'To-do list not found' });
        }
        res.status(200).json({ message: 'To-do list updated successfully', title });
    });
};
exports.updateToDoListTitle = updateToDoListTitle;
const getStats = (req, res) => {
    const listId = req.params.listId;
    // Use the query above to get stats
    const query = `SELECT
  COUNT(*) AS totalTasks,
  SUM(CASE WHEN completed = true THEN 1 ELSE 0 END) AS completedTasks
FROM todos
WHERE list_id = ?;
`;
    database_1.default.query(query, [listId], (error, results) => {
        if (error) {
            return res.status(500).send('Error fetching stats');
        }
        res.json(results[0] || { totalTasks: 0, completedTasks: 0 });
    });
};
exports.getStats = getStats;
