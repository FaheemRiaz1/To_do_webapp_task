import request from 'supertest';
import app from '../../src/index'; 
import db from '../database';

let createdTaskId: number;

describe('Tasks API', () => {
  // Create a list first
  let listId: number;

  beforeAll(done => {
    db.query('INSERT INTO lists (title) VALUES (?)', ['Test List'], (err, result) => {
      if (err) return done(err);
      listId = result.insertId;
      done();
    });
  });

  afterAll(done => {
    db.query('DELETE FROM todos WHERE list_id = ?', [listId], () => {
      db.query('DELETE FROM lists WHERE id = ?', [listId], () => {
        db.end();
        done();
      });
    });
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'Task for testing',
        list_id: listId
      })
      .set('Content-Type', 'application/json');

    console.log('Create Task:', res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdTaskId = res.body.id;
  });

  it('should update the status of a task', async () => {
    const res = await request(app)
      .put(`/tasks/${createdTaskId}/status`)
      .send({ completed: true })
      .set('Content-Type', 'application/json');

    console.log('Update Status:', res.body);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo status updated');
    expect(res.body.completed).toBe(true);
  });

  it('should delete a task by id', async () => {
    const res = await request(app)
      .delete(`/tasks/${createdTaskId}`)
      .set('Content-Type', 'application/json');

    console.log('Delete Task:', res.body);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo deleted successfully');
  });
});
