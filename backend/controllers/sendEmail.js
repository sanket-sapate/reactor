const config = require("../config/config");

async function sendEmail(to,subject,token) {
    const obj = {
        "Recipients": {
          "To": [
            to
          ],
        },
        "Content": {
          "Body": [
            {
              "ContentType": "HTML",
              // '<html><body><a referrerpolicy="no-referrer" href="localhost:3000/resetPassword/'+token+'>Reset Password</a><p>Link expires in 15 minutes</p></body></html>
              "Content": '<h1>Reset Password</h1><p>Click on the link below to reset your password</p><a referrerpolicy="no-referrer" href="localhost:3000/reset-password/'+token+'">Reset Password</a>'
            }
          ],
          "Headers": {
            "city": "New York",
            "age": "34"
          },
          "Postback": "string",
          "EnvelopeFrom": "Reactor <admin@conceptlab.live>",
          "From": "Reactor <admin@conceptlab.live>",
          "ReplyTo": "Sanket Sapate <sanketsapatevnit@gmail.com>",
          "Subject": subject,
          "Utm": {
            "Source": "string",
            "Medium": "string",
            "Content": "string"
          }
        },
        "Options": {
          "TimeOffset": null,
          "PoolName": "My Custom Pool",
          "ChannelName": "Channel01",
          "Encoding": "UserProvided",
          "TrackOpens": "true",
          "TrackClicks": "true"
        }
      }
    let response = false
    const {SMTP_KEY} = config;
    await fetch('https://api.elasticemail.com/v4/emails/transactional', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': SMTP_KEY 
    },
    body: JSON.stringify(obj),

  }).then((response) => response.json())
    .then(()=>response=true)
    .catch((error) => {console.error(error);});
    return response
}

module.exports = sendEmail;