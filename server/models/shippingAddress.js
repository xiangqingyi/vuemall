'use strict';

let mongoose = require('mongoose');
let shippingAddressSchema = new mongoose.Schema({
    name: String,
    tel: Number,
    preAddress: String,
    set: {
        type: Boolean,
        default: false
    },
    ofUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

shippingAddressSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});
module.exports = mongoose.model('Shipping', shippingAddressSchema);