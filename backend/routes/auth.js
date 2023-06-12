
const express = require('express');
const { register, login, getLoggedInUser,googleLogin } = require('../controllers/auth.js');
const authMiddleware = require('../middlewares/auth.js');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/googlelogin', googleLogin);
authRouter.get('/loggedInUser', authMiddleware, getLoggedInUser);

module.exports = authRouter;