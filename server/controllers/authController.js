const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = 'SECRET_KEY';

exports.register = (req, res) => {
    const {username, email, password} = req.body;
    
    bcrypt.hash(password, 12, (err, hashedPass) => {
        if(err) return res.status(500).json({error: 'PASSWORD HASHING ERROR'});
        
        User.create(username, email, hashedPass, (err, result) => {
            if(err) return res.status(500).json({error: 'USER CREATION ERROR'});
            res.json({message: 'USER CREATED SUCCESSFULLY'});
        });
    });
};

exports.login = (req, res) => {
    const {email, password} = req.body;
    
    User.findByemail(email, (err, result) => {
        if(err || result.length === 0){
            return res.status(401).json({error: 'INVALID EMAIL OR PASSWORD'});
        }
        
        const user = result[0];
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if(err || !isMatch) {
                return res.status(401).json({error: 'INVALID EMAIL OR PASSWORD'});
            }
            
            const token = jwt.sign({userId: user.id}, secretKey, {expiresIn: '1h'});
            res.json({message: 'LOGIN SUCCESS', token: token});
        });
    });
};