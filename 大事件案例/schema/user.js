const joi = require('joi')
    //required()表示必填项
const username = joi.string().alphanum().min(6).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

module.exports.reg_login_schema = {
    body: {
        username,
        password
    }
}