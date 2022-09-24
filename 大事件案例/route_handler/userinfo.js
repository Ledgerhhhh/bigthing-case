const db = require('../db/index')
const bcrypt = require('bcryptjs');
module.exports = {
    getUserInfo: (req, res) => {
        // res.cc(req.auth, 0)
        const sqlStr = 'select id,username,nickname,email,user_pic from ev_users where id=?'
        db.query(sqlStr, req.auth.id, (err, results) => {
            if (err) return res.cc(err.message)
            if (results.length !== 1) return res.cc('用户信息获取失败')
            res.send({
                status: 0,
                msg: '获取用户信息成功',
                data: results[0]
            })
        })
    },
    updataUserinfo: (req, res) => {
        const sqlStr = 'update ev_users set ? where id=?'
        db.query(sqlStr, [req.body, req.auth.id], (err, results) => {
            // console.log(req.auth.id);
            if (err) return res.cc(err.message)
            if (req.body.id !== req.auth.id) {
                return res.cc('id不对应')
            }
            if (results.affectedRows !== 1) {
                // console.log(req.auth);
                return res.cc('更新用户基本新信息失败')
            } else {
                return res.cc('更新用户基本新信息成功')
            }

        })
    },
    updatepwd: (req, res) => {
        // if (req.body.oldPwd === req.body.newPwd) {
        if (false) {
            return res.cc('新旧密码一致')
        } else {
            // req.body.oldPwd
            const sqlStr = 'select password from ev_users where id=?'
            db.query(sqlStr, req.auth.id, (err, results) => {
                if (err) return res.cc(err.message)
                if (results.length !== 1) return res.cc('用户不存在')
                const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
                if (!compareResult) {
                    return res.cc('密码错误')
                } else {
                    req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
                    const sqlStr = 'update ev_users set password=? where id=?'
                    db.query(sqlStr, [req.body.newPwd, req.auth.id], (err, results) => {
                        if (err) return res.cc(err.message)
                        if (results.affectedRows !== 1) {
                            return res.cc('修改密码失败')
                        } else {
                            return res.cc('修改密码成功', 0)
                        }
                    })
                }
            })
        }

    },
    updateAvatar: (req, res) => {
        const sqlStr = 'update ev_users set user_pic=? where id=?'
        db.query(sqlStr, [req.body.avatar, req.auth.id], (err, results) => {
            if (err) return res.cc(err.message)
            if (results.affectedRows !== 1) {
                return res.cc('更改头像失败')
            } else {
                return res.cc('更改头像成功', 0)
            }
        })
    }
}