
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/login', userController.login);

router.post('/register', userController.register);

router.get('/logout', userController.logout);

router.post('/getBackPassword', userController.getBackPassword);

router.post('/savePassword', userController.savePassword);

router.get('/info', userController.info);

router.post('/updateInfo', userController.updateInfo);

module.exports = router;