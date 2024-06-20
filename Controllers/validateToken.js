const jwt = require('jsonwebtoken');

function validateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token==null) return res.status(401).json({status:false});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ status: false, message: 'Token expired' });
            } else {
                return res.status(403).json({ status: false, message: 'Token is not valid' });
            }
        }
        req.user=user;
        next();
    });
}

module.exports = validateToken;

