import mysql from 'mysql';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

// Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Establish MySQL connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Successfully connected to MySQL.');

  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS tododb', (err) => {
    if (err) throw err;
    console.log('Database created or already exists.');

    // Use the created database
    db.changeUser({ database: 'tododb' }, (err) => {
      if (err) throw err;

      // Create the lists table
      const createListQuery = `
        CREATE TABLE IF NOT EXISTS lists (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL
        );`;

      // Create the todos table with a foreign key referencing lists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS todos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          completed BOOLEAN NOT NULL DEFAULT FALSE,
          list_id INT,
          FOREIGN KEY (list_id) REFERENCES lists(id)
        );`;

      // Execute both queries
      db.query(createListQuery, (err) => {
        if (err) throw err;
        console.log('Table "lists" created or already exists.');
      });

      db.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Table "todos" created or already exists.');
      });
    });
  });
});

export default db;
