
const Order = require('../models/order');
const OrderNo = require('../utils/orderNo');

exports.save = async (req, res) => {
    try {
        const postData = req.body;
        const _order = new Order(Object.assign(postData, {orderId: orderNo()}));
        await _order.save();    
        return res.json({
            code: 200,
            desc: '保存成功'
        })
    } catch (error) {
        console.log(error.message)
        return res.json({
            code: 403,
            desc: error.message
        })   
    }
}

exports.getlist = async (req, res) => {
    const userId = req.query.id;
    const type = parseInt(req.query.type);
    switch (type) {
        case 1:
            Order.find({ofUser: userId}).populate('goodList.product').sort({createTime: -1}).exec((err, orders) => {
                if (err) {
                    return res.json({
                        code: 403,
                        desc: err.message
                    })
                } else {
                    return res.json({
                        code: 200,
                        desc: 'success',
                        list: orders
                    });
                }
            });
            break;
        case 2:
            Order.find({ofUser: userId, status: 1}).populate('goodList.product').sort({createTime: -1}).exec((err, orders) => {
                if (err) {
                    return res.json({
                        code: 403,
                        desc: err.message
                    })
                } else {
                    return res.json({
                        code: 200,
                        desc: 'success',
                        list: orders
                    });
                }
            });
            break;
        case 3:
            Order.find({ofUser: userId, status: 2}).populate('goodList.product').sort({createTime: -1}).exec((err, orders) => {
                if (err) {
                    return res.json({
                        code: 403,
                        desc: err.message
                    })
                } else {
                    return res.json({
                        code: 200,
                        desc: 'success',
                        list: orders
                    })
                }
            });
            break;
        case 4:
            Order.find({ofUser: userId, status:3}).populate('goodList.product').sort({createTime: -1}).exec((err, orders) => {
                if (err) {
                    return res.json({
                        code: 403,
                        desc: err.message
                    })
                } else {
                    return res.json({
                        code: 200,
                        desc: 'success',
                        list: orders
                    })
                }
            })
            break;
    }
}

exports.del = async (req, res) => {
    try {
        const orderId = req.query.id;
        if (!orderId) {
            return res.json({
                code: 503,
                desc: '系统错误'
            })
        }
        await Order.remove({_id: orderId});
        return res.json({
            code: 200,
            desc: 'success'
        })
    } catch (error) {
        console.log(error.message);
         return res.json({
             code: 403,
             desc: '删除失败'
         })
    }
}