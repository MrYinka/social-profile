const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = (req, res, next) => {
    //Get Token from header
    const token = req.header('x-auth-token');

    //Check if token exist
    if(!token){
        return res.status(403).json({
            msg: 'Unauthorized'
        })
    }else {
        try{
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded.user;
            next();
        }catch (e) {
            res.status(401).json({
                msg: 'Invalid Token'
            });
        }
    }
}