"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Serve frontend files
app.use(express_1.default.static(path_1.default.join(__dirname, 'FRONTEND')));
// Parse JSON requests
app.use(express_1.default.json());
// Optional API endpoint
app.post('/api/logAlarm', (req, res) => {
    const { message, timestamp } = req.body;
    console.log(`Alarm triggered at ${timestamp}: ${message}`);
    res.json({ status: 'success' });
});
// Serve index.html for root
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'FRONTEND', 'index.html'));
});
// Export app for Vercel
exports.default = app;
