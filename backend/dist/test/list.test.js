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
const index_1 = __importDefault(require("../../src/index"));
const database_1 = __importDefault(require("../database"));
let createdTaskId;
describe('Tasks API', () => {
    // Create a list first
    let listId;
    beforeAll(done => {
        database_1.default.query('INSERT INTO lists (title) VALUES (?)', ['Test List'], (err, result) => {
            if (err)
                return done(err);
            listId = result.insertId;
            done();
        });
    });
    afterAll(done => {
        database_1.default.query('DELETE FROM todos WHERE list_id = ?', [listId], () => {
            database_1.default.query('DELETE FROM lists WHERE id = ?', [listId], () => {
                database_1.default.end();
                done();
            });
        });
    });
    it('should create a new task', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
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
    }));
    it('should update the status of a task', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/tasks/${createdTaskId}/status`)
            .send({ completed: true })
            .set('Content-Type', 'application/json');
        console.log('Update Status:', res.body);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Todo status updated');
        expect(res.body.completed).toBe(true);
    }));
    it('should delete a task by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/tasks/${createdTaskId}`)
            .set('Content-Type', 'application/json');
        console.log('Delete Task:', res.body);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Todo deleted successfully');
    }));
});
