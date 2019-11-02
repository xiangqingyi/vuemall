'use strict';

let mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
    orderId: {
        type: String
    },
    deliverName: {
        type: String
    },
    deliverAddress: {
        type: String
    },
    deliverTel: {
        type: Number
    },
    deliverMethod: {
        type: String
    },
    createTime: {
        type: Date,
        default: Date.now()
    },
    ofUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    goodList: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        sum: Number,
        _id: false
    }],
    status: {
        type: Number,
        default: 1
    },
    totalMoney: {
        type: Number
    },
    cost: {
        freight: {
            type: Number, 
            default: 0
        },
        rebase: {
            type: Number,
            default: 0
        },
        serverChange: {
            type: Number, 
            default: 0
        }
    }
});
orderSchema.pre('save', function (next) {
    this.createTime = Date.now();
    next();
});

module.exports = mongoose.model('Order', orderSchema);