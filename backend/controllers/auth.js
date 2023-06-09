const { User } = require("../database/User.js")
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const sendEmail = require("./sendEmail.js");
const brcypt = require('bcryptjs');
const {verifyRecaptcha} = require("./recaptcha.js");
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
            email, password,tokenRecaptcha
        } = req.body;
        let captcha = await verifyRecaptcha(tokenRecaptcha)
        if(!captcha){
            return res.status(400).send({
                error: 'Invalid captcha'
            })
        }
        
        let user = await User.findOne({
            email, 
        })
        if (!user || !brcypt.compareSync(password, user.password)) {
            return res.status(400).send({
                error: 'Invalid credentials'
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

async function forgetPassword(req,res){
    try {
        let {email,tokenRecaptcha} = req.body
        let captcha = await verifyRecaptcha(tokenRecaptcha)
        if(!captcha){
            return res.status(400).send({
                error: 'Invalid captcha'
            })
        }
        let user = await User.findOne({
            email, 
        })

        if (user) {
            const token = generateToken({email});
            const response = await sendEmail(user.email,'Reset Password',token)
            if(!response){
                return res.status(400).send({
                    error: 'Something went wrong'
                })
            }
        }

        return res.send({
            message: 'Reset link sent to your email',
        })
    } catch (error) {
        return res.status(500).send({
            error:'Something went wrong'
        })
    }
}

async function resetPassword(req,res){
    try {
        let {token,password,recaptchaToken} = req.body
        let {email} = jwt.verify(token,config.JWT_SECRET_KEY)
        const captcha = await verifyRecaptcha(recaptchaToken)
        if(!captcha){
            return res.status(400).send({
                error: 'Invalid captcha'
            })
        }
        let user = await User.findOne({
            email, 
        })
        if(!user){
            return res.status(400).send({
                error: 'Invalid token'
            })
        }
        password = brcypt.hashSync(password);
        user.password = password
        await user.save()
        return res.send({
            message: 'Password reset successful',
        })
    } catch (error) {
        return res.status(500).send({
            error:'Something went wrong'
        })
    }
}

async function checkToken(req,res){
    try {
        const {token} = req.body
        let {email,iat} = jwt.verify(token,config.JWT_SECRET_KEY)
        if(!email ){
            throw new Error()
        }
        return res.send({
            message: 'Token verified',
            result:true
        })
    } catch (error) {
        return res.send({
            message: 'Token not verified',
            result:false
        })
    }
}
module.exports = {
    register,
    login,
    getLoggedInUser,
    googleLogin,
    forgetPassword,
    resetPassword,
    checkToken
}