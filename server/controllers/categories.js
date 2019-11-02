
const Product = require('../models/product');
const Categories = require('../models/category');


exports.list = async (req, res) => {
    try {
        let categories = await Categories.find({path: 'products', select: 'name price image amount'});
        return res.json({
            code: 200,
            desc: 'success',
            list: categories
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}

// 增加分类接口
exports.add = async (req, res) => {
    try {
        if (req.body.id) {
            let category = await Categories.findById(req.body.id);
            let _category = Object.assign(category, req.body);
            await _category.save();
            return res.json({
                code: 200,
                desc: 'success'
            })
        } else {
            let _category = new Categories(req.body);
            await _category.save();
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

// 删除分类
exports.delete = async (req, res) => {
    const categoryId = req.body.id;
    try {
        if (categoryId) {
            let products = await Product.find({category: categoryId});
            if (products && products.length > 0) {
                products.map((ele, index) => {
                    ele.remove();
                })
            }
            await Categories.remove({_id: categoryId});
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


exports.products = async (req, res) => {
    try {
        const categoryId = req.query.id;
        let products = await Product.find({category: categoryId}).populate('products');
        return res.json({
            code: 200,
            data: products,
            desc: 'success'
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            code: 403,
            desc: error.message
        })
    }
}
