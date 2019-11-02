'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
let ObjectId = mongoose.Schema.Types.ObjectId;
const SALT_WORK_FACTOR = 10;

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    sex: {
        type: String,
        default: '男'
    },
    img: String,
    email: String,
    address: String,
    firstSave: {
        type: Boolean,
        default: false
    },
    sign: String,
    shippingAddress: [
        {
            type: ObjectId,
            ref: 'ShippingAddress'
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

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    if (this.firstSave) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, null, null, function(err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next();
            })
        })
    } else {
        next();
    }
}) 

// methods
UserSchema.methods = {
    comparePassword: function(_password, cb) {
        var hash = this.password;
        var isMatch = bcrypt.compareSync(_password, hash);
        cb(null, isMatch)
    }
}

UserSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = mongoose.model('User', UserSchema);