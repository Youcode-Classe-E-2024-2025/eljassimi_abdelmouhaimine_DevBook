const jwt = require('jsonwebtoken');
const secretKey = 'duazidgSAHIH6576';

function vevrifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(403).json({error: 'token required'});
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) return res.status(403).json({error: 'invalid token'});

        req.userId = decoded.userId;
        next();
    });
}

module.exports = vevrifyToken;