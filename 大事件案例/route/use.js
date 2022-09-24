const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
const userhandler = require('../route_handler/user')
    // expressJoi(reg_login_schema)是验证填入信息是否格式正确
router.post('/reguser', expressJoi(reg_login_schema), userhandler.regUser)
router.post('/login', expressJoi(reg_login_schema), userhandler.login)

module.exports = router