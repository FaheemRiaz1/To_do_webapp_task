import { Request, Response } from 'express';
import db from '../../database';

// Get all to-do lists
export const getAllToDoLists = (req: Request, res: Response) => {
  db.query('SELECT * FROM lists', (err, results) => {
    if (err) {
      console.error('Error fetching to-do lists:', err);
      return res.status(500).json({ message: 'Error retrieving to-do lists' });
    }
    res.status(200).json(results);
  });
};

// Create a new to-do list
export const createToDoList = (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }
  const query = 'INSERT INTO lists (title) VALUES (?)';
  db.query(query, [title], (err, result) => {
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

// Delete a to-do list
export const deleteToDoList = (req: Request, res: Response) => {
  const { id } = req.params;
  const query = 'DELETE FROM lists WHERE list_id = ?';
  db.query(query, [id], (err, result) => {
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

// Update a to-do list's title
export const updateToDoListTitle = (req: any, res: any) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const query = 'UPDATE lists SET title = ? WHERE list_id = ?';
  db.query(query, [title, id], (err, result) => {
    if (err) {
      console.error('Error updating to-do list:', err);
      return res.status(500).json({ message: 'Failed to update to-do list' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'To-do list not found' });
    }
    res.status(200).json({ message: 'To-do list updated successfully', title });
  });
}

  export const getStats = (req: any, res: any) => {
    const listId = req.params.listId;
    // Use the query above to get stats
    const query = `SELECT
  COUNT(*) AS totalTasks,
  SUM(CASE WHEN completed = true THEN 1 ELSE 0 END) AS completedTasks
FROM todos
WHERE list_id = ?;
`
    db.query(query, [listId], (error, results) => {
      if (error) {
        return res.status(500).send('Error fetching stats');
      }
      res.json(results[0] || { totalTasks: 0, completedTasks: 0 });
    });
  }


