const express = require('express');
const router = express.Router();
const taskService = require('../services/task.service.js');


const SUCCESS_CODE = 200;
const ERROR_CODE = 400;

const handleSuccessResponse = (res, data) => res.status(SUCCESS_CODE).json(data);
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).json('failed');


router.get('/family-members', async (req, res) => {
    try {
        const allMembers = await taskService.getMembers();
        return handleSuccessResponse(res, allMembers)
    }
    catch{
        return handleFailureResponse(res)
    }
});


router.get('/', async (req, res) => {
    try {
        const allTasks = await taskService.getTasks();
        return handleSuccessResponse(res, allTasks)
    }
    catch{
        return handleFailureResponse(res)
    }
});



router.put('/', async (req, res) => {
    try {
        const newTask = await taskService.addTask(Object.values(req.body));
        return handleSuccessResponse(res, newTask)
    }
    catch{
        return handleFailureResponse(res)
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        await taskService.deleteTask(id);
        return handleSuccessResponse(res, 'task deleted')
    }
    catch{
        return handleFailureResponse(res)
    }
});

module.exports = router;
