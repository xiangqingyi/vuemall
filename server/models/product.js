'use strict';

let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    amount: Number,
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    pv: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

ProductSchema.pre('save', function(next) {
    if (this.isNew) {
        thie.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
})
// 静态方法
ProductSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb)
    },
    findById: function (id, cb) {
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = mongoose.model('Product', ProductSchema);