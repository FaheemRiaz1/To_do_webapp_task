import request from 'supertest';
import app from '../index'; 
import db from '../database';

describe('Tasks API', () => {
  let createdTaskId: number;
  let testListId: number;

  // Create a test list before all tests run
  beforeAll(done => {
    db.query('INSERT INTO lists (title) VALUES (?)', ['Test List'], (err, result) => {
      if (err) return done(err);
      testListId = result.insertId;
      done();
    });
  });

  // Clean up tasks and list after tests
  afterAll(done => {
    db.query('DELETE FROM todos WHERE list_id = ?', [testListId], () => {
      db.query('DELETE FROM lists WHERE id = ?', [testListId], () => {
        db.end();
        done();
      });
    });
  });

  // GET /tasks
  it('should return all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST /tasks
  it('should create a new task', async () => {
    const newTask = {
      title: 'Learn Jest Testing',
      description: 'Write test cases for the API',
      list_id: testListId // ✅ Required
    };

    const res = await request(app)
      .post('/tasks')
      .send(newTask)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdTaskId = res.body.id;

    expect(res.body.title).toBe(newTask.title);
    expect(res.body.description).toBe(newTask.description);
    expect(res.body.completed).toBe(false);
  });

  // PUT /tasks/:id/status
  it('should update the status of a task', async () => {
    const updatedStatus = { completed: true };

    const res = await request(app)
      .put(`/tasks/${createdTaskId}/status`)
      .send(updatedStatus)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo status updated');
    expect(res.body.completed).toBe(true);
  });

  // DELETE /tasks/:id
  it('should delete a task by id', async () => {
    const res = await request(app)
      .delete(`/tasks/${createdTaskId}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo deleted successfully');
  });
});
