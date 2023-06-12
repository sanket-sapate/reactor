const { Department } = require("../database/Department.js")
const { Topic } = require("../database/Topic.js")
const config = require("../config/config");

async function getDepartments(req, res) {
    try{
        let departments = await Department.find({})
        return res.send(departments)
    }catch(err){
        return res.status(400).send({
            message: 'Unexpected Error'
        })
    }
}

async function getTopics(req,res){
    try {
        let subject = req.params.subject
        let topics = await Topic.find({subject})
        if(topics.length)
            return res.send(topics)
        else
        return res.status(404).send({
            message: 'Not Found'
        })
    } catch (error) {
        return res.status(400).send({
            message: 'Unexpected Error'
        })
    }
}

async function getTopic(req,res){
    try {
        let {subject,topic} = req.params
        let data = await Topic.findOne({subject,url_param:topic})
        if(data)
            return res.send(data)
        else
        return res.status(404).send({
            message: 'Not Found'
        })
    } catch (error) {
        return res.status(400).send({
            message: 'Unexpected Error'
        })
    }
}
module.exports = {
    getDepartments,
    getTopics,
    getTopic
}