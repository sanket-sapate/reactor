
const express = require('express');
const { getDepartments ,getTopic,getTopics} = require('../controllers/department.js');

const deptRouter = express.Router();

deptRouter.get('/', getDepartments);
deptRouter.get('/:subject', getTopics);
deptRouter.get('/:subject/:topic', getTopic);

module.exports = deptRouter;