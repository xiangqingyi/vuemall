
const User = require('../models/user');
const ShippingAddress = require('../models/shippingAddress');

exports.list = async (req, res) => {
    const userId = req.query.id;
    try {
        let shippingAddress = await ShippingAddress.find({ofUser: userId}).populate({path: 'shippingAddress'}).sort({'set': -1});
        return res.json({
            code: 200,
            list: shippingAddress,
            desc: 'success'
        })
    } catch (error) {
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}

exports.save = async (req, res) => {
    const addressId = req.body.addressId;
    try {
        if (addressId) {
            let shippingAddress = await ShippingAddress.findById(addressId);
            let _shippingAddress = Object.assign(shippingAddress, {
                name: req.body.name,
                tel: req.body.tel,
                address: req.body.address,
                ofUser: req.body.ofUser,
                preAddress: req.body.preAddress
            });
            await _shippingAddress.save();
            return res.json({
                code: 403,
                desc: 'success'
            }) 
        } else {
            // new add
            let _shippingAddress = new ShippingAddress(req.body);
            let user = await User.findById(req.body.ofUser);
            if (user.shippingAddress.indexOf(_shippingAddress._id) > -1) {
                return;
            } else {
                user.shippingAddress.length === 0 ? _shippingAddress.set = true : _shippingAddress.set = false;
                user.shippingAddress.push(_shippingAddress._id);
            }
            let _user = Object.assign(user, {firstSave: false});
            _user.save();
            _shippingAddress.save();
            return res.json({
                code: 200,
                desc: 'success'
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

exports.getDetail = async (req, res) => {
    const id = req.query.id;
    try {
        let shippingAddress = await ShippingAddress.findById(id);
        return res.json({
            code: 200,
            desc: 'success',
            data: shippingAddress
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}
// 1 === delete 2 === default
exports.operate = async (req, res) => {
    try {
        const addressId = req.body.id;
        const operateId = req.body.operateId;
        const userId = req.body.userId;
        if (addressId && operateId === 1) {
            let user = await User.findById(userId);
            const index = user.shippingAddress.indexOf(addressId);
            user.shippingAddress.slice(index, 1);
            await user.save();
            return res.json({
                code: 200,
                desc: 'success'
            })    
        } else if (addressId && operateId === 2) {
            let shippingAddress = await ShippingAddress.find({})
            shippingAddress.map(async (item) => {
                if (item._id.toString() !== addressId) {
                    item.set = false;
                    await item.save();
                }
            })
            let _shippingAddress = await ShippingAddress.findById(addressId);
            _shippingAddress.set = true;
            await _shippingAddress.save();
            return res.json({
                code: 200,
                desc: 'success'
            })
        } else {
            return res.json({
                code: 500,
                desc: '缺少必要的参数'
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