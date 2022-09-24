const express = require('express');
const getUserInfo = require('../route_handler/userinfo')
const route = express.Router();
const expressJoi = require('@escook/express-joi')
const { updata_userinfo_schema } = require('../schema/userinfo')
const { updatepwd, avatar } = require('../schema/update')
route.get('/userinfo', getUserInfo.getUserInfo)
route.post('/userinfo', expressJoi(updata_userinfo_schema), getUserInfo.updataUserinfo)
route.post('/updatepwd', expressJoi(updatepwd), getUserInfo.updatepwd)
route.post('/update/avatar', expressJoi(avatar), getUserInfo.updateAvatar)
module.exports = route