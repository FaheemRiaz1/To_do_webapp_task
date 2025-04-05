import mysql from 'mysql';
import { config } from 'dotenv';

config(); // Loading the environment variables

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Successfully connected to MySQL.');
  
  // Create the database
  db.query('CREATE DATABASE IF NOT EXISTS tododb', (err) => {
    if (err) throw err;
    console.log('Database created or already exists.');
    
    // Use the new database
    db.changeUser({database : 'tododb'}, (err) => {
      if (err) throw err;

      // Create the table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS todos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          completed BOOLEAN NOT NULL DEFAULT FALSE,
          FOREIGN KEY (list_id) REFERENCES lists(id)
        );`;
        const createListQuery = `
       CREATE TABLE IF NOT EXISTS lists (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
  );`;

      db.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Table created or already exists of todos');
      });
      db.query(createListQuery, (err) => {
        if (err) throw err;
        console.log('Table created or already exists of lists.');
      });
    });
  });
});

export default db;
