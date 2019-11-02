
const Product = require('../models/product');
const Categories = require('../models/category');


exports.list = async (req, res) => {
    // 设置分页，默认10条,第一页开始
    try {
        let pageSize = parseInt(req.query.pageSize) === 0 || !req.query.pageSize ? 10 : parseInt(req.query.pageSize);
        let pageNo = parseInt(req.query.pageNo) === 0 || !req.query.pageNo ? 1 : parseInt(req.query.pageNo);
        let count = await Product.count()
        let products = await Product.find({}).limit(pageSize).skip((pageNo - 1) * pageSize).populate({path: 'category', select: 'name'});
        return res.json ({
            code: 200,
            count: count,
            desc: 'success',
            list: products
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}

exports.addAndupdate = async (req, res) => {
    try {
        if (req.body._id) {
            let productObj = req.body;
            let product = await Product.findById(productObj._id).exec();
            let _product = Object.assign(product, productObj);
            const categoryId = _product.category;
            let category = await Categories.findById(categoryId);
            if (category.products.indexOf(_product._id) > -1) {
                return;  // 已经存在
            } else {
                category.products.push(_product._id);
            }
            await category.save();
            // 删除
            let delCategory = await Categories.findOne({"products":_product._id}).exec();
            if (delCategory && delCategory.products.length > 0) {
                delCategory.products.map((e, i) => {
                    if (e.toString() === _product._id.toString()) {
                        delCategory.products.splice(i, 1);
                    }
                });
            }
            await delCategory.save();
            await _product.save();
            return res.json({
                code: 200,
                desc: 'success'
            })
        } else {
            // new product
            let products = new Product(req.body);
            const categoryId = products.category;
            let category = await Categories.findById(categoryId);
            if (category.products.indexOf(products._id) > -1) {
                return;
            } else {
                category.products.push(products._id)
            }
            await category.save();
            await products.save();
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

// 查询
exports.inquire = async (req, res) => {
    let productId = req.body.id;
    try {
        if (productId) {
            let product = await Product.findById(productId);
            return res.json({
                code: product ? 200 : 403,
                desc: product ? 'success' : 'fail',
                data: product
            })
        } else {
            return res.json({
                code: 500,
                desc: '缺少必要参数'
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

// 删除商品
exports.delete = async (req, res) => {
    let productId = req.body.id;
    try {
        if (productId) {
            await Product.remove({_id: productId});
            return res.json({
                code: 200,
                desc: 'success'
            })
        } else {
            return res.json({
                code: 500,
                desc: '缺少必要参数'
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
// 搜索

exports.search = async (req, res) => {
    try {
        let searchText = req.query.searchText;
        if (searchText) {
            const regex = new RegExp(searchText, 'i');
            let products = await Product.find({name: regex});
            return res.json({
                code: 200,
                desc: 'success',
                data: products
            })
        } else {
            return res.json({
                code: 500,
                desc: '缺少必要参数'
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
