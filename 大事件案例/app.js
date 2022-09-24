const express = require('express')
const cors = require('cors')
const app = express();
const useroute = require('./route/use')
const joi = require('joi')
const config = require('./config')
const expressJwt = require('express-jwt')
const useinfoRouter = require('./route/userinfo')
app.use(cors())
    //只能解析普通表单数据
app.use(express.urlencoded({ extended: false }))
app.use(function(req, res, next) {
        res.cc = function(err, status = 1) {
            res.send({
                status,
                msg: err instanceof Error ? err.message : err
            })
        }
        next()
    })
    //全局除了api接口的，其他访问服务器都要身份认证
app.use(expressJwt.expressjwt({ secret: config.jwtSecretkey, algorithms: ['HS256'] }).unless({ path: [/\/api/] }))
app.use('/api', useroute)
app.use('/my', useinfoRouter)
app.use(function(err, req, res, next) {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    if (err.name === 'UnauthorzedError') {
        return res.send('身份认证过期')
    }
    return res.cc(err)
})
app.listen(80, () => {
    console.log('express running at http://127.0.0.1');
})