
const express = require('express');
const { getDepartments } = require('../controllers/department.js');

const deptRouter = express.Router();

deptRouter.get('/', getDepartments);
deptRouter.get('/:subject', getDepartments);
deptRouter.get('/:subject/:topic', getDepartments);

module.exports = deptRouter;