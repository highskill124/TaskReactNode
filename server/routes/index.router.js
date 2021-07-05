const express = require('express');
const router = express.Router();

const ctrlTask = require('../controllers/task.controller');

router.get('/getTasks', ctrlTask.getTasks);
router.put('/completed', ctrlTask.completed);

module.exports = router;

