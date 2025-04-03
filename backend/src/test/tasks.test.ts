import request from 'supertest';
import app from '../index'; // make sure this exports your Express app

describe('Tasks API', () => {
  let createdTaskId: number; // used to store task ID across tests

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
    };

    const res = await request(app)
      .post('/tasks')
      .send(newTask)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdTaskId = res.body.id; // Save it for update/delete

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
    expect(res.body.completed).toBe(updatedStatus.completed);
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
