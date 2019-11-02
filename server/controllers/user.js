
const User = require('../models/user');
const sendMail = require('../utils/sendMail');
const createCode = require('../utils/tool');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const moment = require('moment');


exports.login = async (req, res) => {
    let obj = req.body;
    try {
        let user = await User.findOne({name: obj.name}).exec();
        if (user) {
            user.comparePassword(obj.password, (err, isMatch) => {
                if (err) console.log(err);
                if (isMatch) {
                    // 验证成功
                    req.session.user = user;
                    return res.json({
                        code: 200,
                        desc: '登录成功',
                        data: user
                    })
                } else {
                    // 密码验证失败
                    return res.json({
                        code: 403,
                        desc: '密码验证失败！，请重新登录'
                    })
                }
            })
        } else {
            return res.json({
                code: 403,
                desc: '用户不存在！'
            })
        }

    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}

// 注册接口
exports.register = async (req, res) => {
    let obj = req.body;
    try {
        let user = await User.findOne({name: obj.name}).exec();
        if (user) {
            return res.json({
                code: 403,
                desc: '账号存在,请重新注册或去登录'
            })
        } else {
            let _user = new User(obj);
            _user.firstSave = true;
            _user.save((err) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        code: 403,
                        desc: '注册失败'
                    })
                } 
                return res.json({
                    code: 200,
                    desc: '注册成功，去登录吧'
                })
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}

exports.logout = async (req, res) => {
    try {
        delete req.session.user;
        return res.json({
            code:200,
            desc: '注销成功'
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: '注销失败'
        })
    }
}

// 申请修改密码,确认信息，发送邮件验证码
exports.getBackPassword = async (req, res) => {
    let userObj = req.body;
    try {
        let user = await User.findOne({name: userObj.name}).exec();
        if (user) {
            let identifyingCode = createCode();
            if (user.email === userObj.email) {
                sendMail(userObj.email, '邮箱验证码', '您的验证码为: <b>' + identifyingCode + '</b>').then(sendRes => {
                    return res.json({
                        code: 200,
                        desc: '发送邮件成功',
                        data: sendRes,
                        identifyingCode: identifyingCode
                    })
                }).catch(err => {
                    return res.json({
                        code: 403,
                        desc: '发送邮件失败',
                        msg: err.message
                    })
                })
            } else {
                return res.json({
                    code: 403,
                    desc: '邮箱不匹配，请输入注册邮箱'
                })
            }
        } else {
            return res.json({
                code: 403,
                desc: '没有此用户'
            })
        }

    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}

// 存储新密码
exports.savePassword = async (req, res) => {
    let userObj = req.body;
    try {
        let user = await User.findOne({name: userObj.name}).exec(); 
        if (user) {
            let _user = Object.assign(user, userObj, {firstSave: true});
            _user.save((err) => {
                if (err) console.log(err);
                return res.json({
                    code: 200,
                    desc: 'success'
                })
            })
        } else {
            return res.json({
                code: 403,
                desc: '没有此用户'
            })
        }    
    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}

// 获取user信息
exports.info = async (req, res) => {
    try {
        let user = await User.findById(req.query.id).exec();
        if (user) {
            return res.json({
                code: 200,
                data: user

            })
        } else {
            return res.json({
                code: 403,
                desc: '没有此用户'
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}

exports.updateInfo = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "../static/uploads";
    form.parse(req, async function(err, fields, files) {
        let headPic;
        if (files && JSON.stringify(fields) !== "{}") {
            // 需要上传照片
            const t = moment(new Date()).format('YYYY_MM_DD');
            const timestamp = Date.now();
            const extname = path.extname(files.file.name);
            const oldpath = path.join(__dirname, '../', files.file.path);
            headPic = t + '_' + timestamp + extname;
            const newpath = path.join(__dirname, '../static/uploads', headPic);
            fs.rename(oldpath, newpath, (err) => {
                if (err) {
                    return res.json({
                        code: 401,
                        desc: '图片上传失败'
                    })
                }
            })
        }
        let user = await User.findOne({name: fields.name})
        if (user) {
            let _user = Object.assign(user, fields, headPic ? {img: headPic, firstSave: false} : '');
            _user.save((err) => {
                if (err) console.log(err);
                return res.json({
                    code: 200, 
                    desc: '保存成功'
                })
            })
        } else {
            return res.json({
                code: 403,
                desc: '没有此用户'
            })
        }
    })
}