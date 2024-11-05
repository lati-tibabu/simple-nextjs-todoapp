const express = require('express');
const router = express.Router();
const {Task} = require('../models');

// 1. create task
router.post('/', async (req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }catch(error){
        res.status(400).json({error: error.message});
    }
});

// 2. read all task
router.get('/', async (req, res) => {
    try{
        const tasks = await Task.findAll();
        res.json(tasks);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

// 3. update task 
router.put('/:id', async (req, res) => {
    try {
        const [updated] =  await Task.update(req.body, {
            where: {task_id: req.params.id}
        });
        if (updated){
            const updatedTask = await Task.findByPk(req.params.task_id); // Find updated user
            res.status(200).json(updatedTask); // Respond with the updated user
        } else {
            res.status(404).json({ error: 'Task not found' }); // User not found
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// 4. delete task
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await await Task.destroy({
            where: {task_id: req.params.id}
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({error: 'Task not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

module.exports = router;