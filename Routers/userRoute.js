const express = require('express');
const userSignup = require('../controllers/usercontroller/signup');
const userLogin = require('../controllers/usercontroller/login');

const router = express.Router();

router.post('/signup', userSignup)

router.post('/login', userLogin)


module.exports = router;