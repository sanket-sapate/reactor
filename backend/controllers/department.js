const { Department } = require("../database/Department.js")
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

module.exports = {
    getDepartments
}