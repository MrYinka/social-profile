const express = require('express');
const router = express.Router();
const { userSignUpValidator }  = require('../validations');
const { signUp } = require('../controllers/auth');

const User = require('../models/Users')

//@route  POST api/users
//@desc   Register User
//@access Public
router.post('/', userSignUpValidator, signUp);


module.exports = router;