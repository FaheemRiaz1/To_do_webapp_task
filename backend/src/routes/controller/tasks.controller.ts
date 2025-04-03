import express from 'express';
import cors from 'cors';
import db from '../../database'; // Ensure your database.ts is exporting the connection
import { Request, Response } from 'express';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Test Route
// export  const helloRoute = (req: Request, res: Response) => {
//     res.send('Hello World!');
// };

// Example using your database
export const getAllTasks = (req: Request, res: Response) => {
    db.query('SELECT * FROM todos', (err, results) => {  // Make sure the table name matches your schema
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(results);
        }
    });
};

// Add new todo
export const createTask = (req: Request, res: Response): void => {
    const { title, description } = req.body;
  
    if (!title) {
        res.status(400).json({ message: 'Title is required' })
        return;
     };
  
    const query = 'INSERT INTO todos (title, description, completed) VALUES (?, ?, false)';
    db.query(query, [title, description], (err, result) => {
      if (err) return res.status(500).json({ message: 'DB insert failed', error: err });
  
      res.status(201).json({
        id: result.insertId,
        title,
        description,
        completed: false,
      });
    });
  };
//Delete todo by ID
export const deleteTasks = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = 'DELETE FROM todos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB delete failed', error: err });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json({ message: 'Todo deleted successfully' });
  });
};

// Update todo status (completed true/false)
export const updateTaskStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  const query = 'UPDATE todos SET completed = ? WHERE id = ?';
  db.query(query, [completed, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB update failed', error: err });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json({ message: 'Todo status updated', completed });
  });
};


