const jwt = require('jsonwebtoken');
const secretKey = 'SECRET_KEY';

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);
    
    if (!authHeader) {
        return res.status(403).json({ error: 'Authorization header required' });
    }
    
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);
    
    if (!token) {
        return res.status(403).json({ error: 'Token required' });
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('JWT Error:', err);
            return res.status(403).json({ error: 'Invalid token' });
        }
        
        req.userId = decoded.userId;
        next();
    });
}

module.exports = verifyToken;