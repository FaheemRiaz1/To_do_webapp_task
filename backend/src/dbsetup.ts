import db from './database';

export const createTasksTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
    );`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating tasks table', err);
            return;
        }
        console.log('Tasks table created or already exists of tasks');
    });
};
export const createListsTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS lists (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
  );
  `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating tasks table', err);
            return;
        }
        console.log('Tasks table created or already exists of lists');
    });
};


  

export const initializeDatabase = () => {
    createTasksTable();
    createListsTable();
};
