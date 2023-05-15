
const express = require('express');
const { register, login, getLoggedInUser, signinWithGitub } = require('../controllers/auth.js');
const authMiddleware = require('../middlewares/auth.js');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/github-signin/:code', signinWithGitub);
authRouter.get('/loggedInUser', authMiddleware, getLoggedInUser);

module.exports = authRouter;