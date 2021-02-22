//Using JSON Web Token
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('../config/default.json')
//Importing User Model
const User = require('../models/Users');

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    //Awaiting the user to find
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(403).json({
            error: "User Already Exist"
        });
    }

    const avatar = gravatar.url(email,{
        s: '200',
        r: 'pg',
        d: 'mm'
    });

    //Awaiting the user to be created
    const user = await new User({
        name, email, password, avatar
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    const payload = {
        user : {
            id:user.id
        }
    }

    jwt.sign(payload, config.JWT_SECRET, { expiresIn: 3600000 }, (err, token)=> {
        if(err){
            throw err;
        }else{
            res.json({ token })
        }
    });

};
