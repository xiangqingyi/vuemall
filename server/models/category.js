'use strict';

let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let CategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    products: [
        {
            type: ObjectId,
            ref: 'Product'
        }
    ],
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
})

CategorySchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next()
})
CategorySchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb)
    },
    findById: function (id, cb) {
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = mongoose.model('Category', CategorySchema);