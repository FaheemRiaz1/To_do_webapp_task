"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasks_routes_1 = __importDefault(require("./routes/router/tasks.routes")); // ✅ correct path
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // ✅ Important
app.use('/', tasks_routes_1.default); // ✅ This is what connects your /tasks
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = app;
