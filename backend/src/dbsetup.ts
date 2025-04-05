import db from './database';

/**
 * Creates the 'todos' table if it doesn't exist.
 */
export const createTasksTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      list_id INT,
      FOREIGN KEY (list_id) REFERENCES lists(id)
    );
  `;

  db.query(sql, (err) => {
    if (err) {
      console.error('Error creating "todos" table:', err);
      return;
    }
    console.log('"todos" table created or already exists.');
  });
};

/**
 * Creates the 'lists' table if it doesn't exist.
 */
export const createListsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS lists (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );
  `;

  db.query(sql, (err) => {
    if (err) {
      console.error('Error creating "lists" table:', err);
      return;
    }
    console.log('"lists" table created or already exists.');
  });
};

/**
 * Initializes the database by creating necessary tables.
 */
export const initializeDatabase = () => {
  createListsTable(); // Create lists first (as todos has foreign key)
  createTasksTable(); // Then create todos
};
