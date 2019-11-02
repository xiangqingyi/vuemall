
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.list);

router.post('/save', productController.addAndupdate);

router.post('/inquire', productController.inquire);

router.post('/delete', productController.delete);

router.get('/search', productController.search);

module.exports = router;