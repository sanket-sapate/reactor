
const express = require('express');
const { register, login, getLoggedInUser,googleLogin,forgetPassword,resetPassword,checkToken } = require('../controllers/auth.js');
const authMiddleware = require('../middlewares/auth.js');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/googlelogin', googleLogin);
authRouter.get('/loggedInUser', authMiddleware, getLoggedInUser);
authRouter.post('/forgetPassword', forgetPassword);
authRouter.post('/resetPassword', resetPassword);
authRouter.post('/checkToken', checkToken);

module.exports = authRouter;