const joi = require('joi')
const oldPwd = joi.string().pattern(/^[\S]{6,12}$/).required();
// const newPwd = joi.string().pattern(/^[\S]{6,12}$/).required();
const newPwd = joi.not(joi.ref('oldPwd')).concat(oldPwd)
const avatar = joi.string().dataUri().required()
module.exports.updatepwd = {
    body: {
        oldPwd,
        newPwd
    }
}
module.exports.avatar = {
    body: {
        avatar
    }
}