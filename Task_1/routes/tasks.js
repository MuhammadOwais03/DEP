const express = require('express');
const router = express.Router();
const { doQueryInsert, doQueryDelete, doQueryPatch, doQueryGet } = require('../controllers/taskControllers.js');

// Get all tasks
router.get('/task', (req, res) => {
    const query = 'SELECT * FROM tasks';
    doQueryGet(query, res);
});

// Add a new task
router.post('/task', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    doQueryInsert(query, [title, description], res);
});

// Delete a task
router.delete('/task/:id', (req, res) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    doQueryDelete(query, [req.params.id], res);
});

// Update a task's completion status
router.patch('/task/:id', (req, res) => {
    const { completed } = req.query;
    const { id } = req.params;
    const isCompleted = completed === 'true' ? 1 : 0;
    const query = 'UPDATE tasks SET is_completed = ? WHERE id = ?';
    doQueryPatch(query, [isCompleted, id], res);
});

module.exports = router;
