const { User } = require("../database/User.js")
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const axios = require('axios')
const brcypt = require('bcryptjs');

function generateToken(user) {
    const { _id, name, email, image} = user;

    return jwt.sign({
        _id, name, email, image
    }, config.JWT_SECRET_KEY);

}

async function register(req, res) {
    try {
        let {
            name, email, password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                error: 'Incomplete data'
            })
        }

        let user = await User.findOne({
            email
        })

        if (user) {
            return res.status(400).send({
                error: 'User with email already exists'
            })
        }

        password = brcypt.hashSync(password);

        user = await User.create({
            name, email, 
            signinMethod: 'email-password',
            password
        });

        return res.send({
            message: 'Registration successful'
        })

    } catch(err) {
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function login(req, res) {
    try {

        const {
            email, password
        } = req.body;

        let user = await User.findOne({
            email, 
        })

        if (!user) {
            return res.status(400).send({
                error: 'User with email does not exist'
            })
        }

        if (!brcypt.compareSync(password, user.password)) {
            return res.status(400).send({
                error: 'Wrong password'
            })
        }

        // Create JWT token
        const token = generateToken(user);
        const { _id, name, image } = user;

        return res.send({
            message: 'Login successful',
            data: {
                token,
                user: {
                    _id, name, email, image
                }
            }
        })

    } catch(err) {
        console.log(err);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function getLoggedInUser(req, res) {
    try {
        const user = req.user;

        return res.send({
            data: user
        })


    } catch(err) {
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

module.exports = {
    register,
    login,
    getLoggedInUser
}