const express = require('express');
const router = express.Router();
const auth = require('../validations/auth')
const User = require('../models/Users')

//@route  GET api/auth
//@desc   Test route
//@access Public
router.get('/', auth, async (req, res)=> {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({
            user
        })
    }catch (e){
        console.log(`Server Error: ${e.message}`)
    }

});


module.exports = router;