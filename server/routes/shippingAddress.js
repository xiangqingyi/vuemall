
const express = require('express');
const router = express.Router();
const shippingAddressController = require('../controllers/shippingAddress');

router.get('/', shippingAddressController.list);

router.post('/save', shippingAddressController.save);

router.get('/getDetail', shippingAddressController.getDetail);

router.post('/operate', shippingAddressController.operate);

module.exports = router;