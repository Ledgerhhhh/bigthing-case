const { response } = require('express');
const db = require('../db/index')
    //加密密码中间件
const bcrypt = require('bcryptjs');
const { result } = require('@hapi/joi/lib/base');
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports.regUser = (req, res) => {
    const userinfo = req.body;
    // if (!userinfo.username || !userinfo.password) {
    //     // return res.send({
    //     //         status: 1,
    //     //         msg: '用户名或者密码为空'
    //     //     })
    //     return res.cc('用户名或者密码为空')
    // }
    const sql = 'select * from ev_users where username=?'
        // db.query('SELECT 1', (err, result) => {
        //     if (err) return console.log(err.message);
        //     //打印出 [ { '1': 1 } ]就是表明数据库连接正常
        //     console.log(result);
        // })
    db.query(sql, userinfo.username, (err, result) => {
        if (err) {
            // return res.send({
            //         status: 1,
            //         msg: err.message
            //     })
            return res.cc(err)
        }
        if (result.length > 0) {
            // return res.send({
            //         status: 1,
            //         msg: '用户名被占用'
            //     })
            return res.cc('用户名被占用')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sqlStr = 'insert into ev_users set?'
        db.query(sqlStr, userinfo, (err, result) => {
            if (err) {
                // return res.send({
                //         status: 1,
                //         msg: err.message
                //     })
                return res.cc(err)
            }
            if (result.affectedRows !== 1) {
                // return res.send({
                //         status: 1,
                //         msg: '注册用户失败，请稍后再试'
                //     })
                return res.cc('注册用户失败，请稍后再试')
            } else {
                // return res.send({
                //         status: 0,
                //         msg: '注册用户成功'
                //     })
                return res.cc('注册用户成功', 0)
            }
        })
    })
}
module.exports.login = (req, res) => {
    const userinfo = req.body;
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('用户名错误')
            //调用bcrypt.compareSync(用户提交的密码，数据库中的密码)
            //返回值是布尔值
            // let hash = bcrypt.hashSync(result[0].password)
        const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)
        if (!compareResult) return res.cc('密码错误')
        const user = {...result[0], password: '', user_pic: '' };
        // console.log(user);
        const tokenStr = jwt.sign(user, config.jwtSecretkey, { expiresIn: config.expiresIn })
        return res.send({
            status: 0,
            msg: 'login successfully',
            token: 'Bearer ' + tokenStr
        })
    })
}