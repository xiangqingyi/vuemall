
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

router.get('/', categoryController.list);

router.post('/add', categoryController.add);

router.post('/delete', categoryController.delete);

router.get('/products', categoryController.products);

module.exports = router;