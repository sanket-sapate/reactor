const { User } = require("../database/User.js")
const jwt = require('jsonwebtoken');
const config = require("../config/config");
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
            email, password
        } = req.body;

        if (!email || !password) {
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

async function googleLogin(req,res){
    try {
        let {token} = req.body
        let {email,name,picture:image} = jwt.decode(token)
        let user = await User.findOne({
            email,
        })
        if(!user){
            user = await User.create({
                name, email, 
                signinMethod: 'google-signin',image
            });
            req.body.redirect = true
        }
        token = generateToken(user);
        const { _id} = user;

        return res.send({
            message: 'Login successful',
            data: {
                token,
                user: {
                    _id, name, email, image
                },
                redirect : req.body.redirect?true:false
            }
        })
    } catch (error) {
        return res.status(500).send({
            error:'Something went wrong'
        })
    }
}

module.exports = {
    register,
    login,
    getLoggedInUser,
    googleLogin
}