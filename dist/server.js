"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// SRC/server.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../FRONTEND')));
// Example POST endpoint
app.post('/api/log', (req, res) => {
    console.log('Frontend sent data:', req.body);
    res.json({ message: 'Data received successfully' });
});
// Serve frontend for all other routes
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../FRONTEND/index.html'));
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
