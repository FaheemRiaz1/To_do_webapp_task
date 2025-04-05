"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const database_1 = __importDefault(require("../database"));
describe('Tasks API', () => {
    let createdTaskId;
    let testListId;
    // Create a test list before all tests run
    beforeAll(done => {
        database_1.default.query('INSERT INTO lists (title) VALUES (?)', ['Test List'], (err, result) => {
            if (err)
                return done(err);
            testListId = result.insertId;
            done();
        });
    });
    // Clean up tasks and list after tests
    afterAll(done => {
        database_1.default.query('DELETE FROM todos WHERE list_id = ?', [testListId], () => {
            database_1.default.query('DELETE FROM lists WHERE id = ?', [testListId], () => {
                database_1.default.end();
                done();
            });
        });
    });
    // GET /tasks
    it('should return all tasks', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/tasks');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    // POST /tasks
    it('should create a new task', () => __awaiter(void 0, void 0, void 0, function* () {
        const newTask = {
            title: 'Learn Jest Testing',
            description: 'Write test cases for the API',
            list_id: testListId // ✅ Required
        };
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/tasks')
            .send(newTask)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdTaskId = res.body.id;
        expect(res.body.title).toBe(newTask.title);
        expect(res.body.description).toBe(newTask.description);
        expect(res.body.completed).toBe(false);
    }));
    // PUT /tasks/:id/status
    it('should update the status of a task', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedStatus = { completed: true };
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/tasks/${createdTaskId}/status`)
            .send(updatedStatus)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Todo status updated');
        expect(res.body.completed).toBe(true);
    }));
    // DELETE /tasks/:id
    it('should delete a task by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/tasks/${createdTaskId}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Todo deleted successfully');
    }));
});
