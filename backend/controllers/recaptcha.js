const config = require("../config/config");

async function verifyRecaptcha (captcha){
    const {RECAPTCHA_KEY} = config;
    let response = false
    await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_KEY}&response=${captcha}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(res => res.json())
    .then(json => {
        response = json.success;
    })
    return response;
}

module.exports = {verifyRecaptcha};