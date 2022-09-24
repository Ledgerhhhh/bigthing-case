const joi = require('joi')
    //required()表示必填项
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const username = joi.string().min(5).required()
module.exports.updata_userinfo_schema = {
    body: {
        id,
        username,
        nickname,
        email,
    }
}