
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/', orderController.save);

router.get('/list', orderController.getlist);

router.get('/del', orderController.del);

module.exports = router