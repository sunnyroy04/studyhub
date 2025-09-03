const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/signup', adminController.signup);

module.exports = router;
