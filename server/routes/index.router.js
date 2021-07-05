const express = require('express');
const router = express.Router();

const ctrlTask = require('../controllers/task.controller');

router.post('/getTasks', ctrlTask.getTasks);

module.exports = router;

