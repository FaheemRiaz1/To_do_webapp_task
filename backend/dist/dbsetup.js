"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.createListsTable = exports.createTasksTable = void 0;
const database_1 = __importDefault(require("./database"));
/**
 * Creates the 'todos' table if it doesn't exist.
 */
const createTasksTable = () => {
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
    database_1.default.query(sql, (err) => {
        if (err) {
            console.error('Error creating "todos" table:', err);
            return;
        }
        console.log('"todos" table created or already exists.');
    });
};
exports.createTasksTable = createTasksTable;
/**
 * Creates the 'lists' table if it doesn't exist.
 */
const createListsTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS lists (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );
  `;
    database_1.default.query(sql, (err) => {
        if (err) {
            console.error('Error creating "lists" table:', err);
            return;
        }
        console.log('"lists" table created or already exists.');
    });
};
exports.createListsTable = createListsTable;
/**
 * Initializes the database by creating necessary tables.
 */
const initializeDatabase = () => {
    (0, exports.createListsTable)(); // Create lists first (as todos has foreign key)
    (0, exports.createTasksTable)(); // Then create todos
};
exports.initializeDatabase = initializeDatabase;
