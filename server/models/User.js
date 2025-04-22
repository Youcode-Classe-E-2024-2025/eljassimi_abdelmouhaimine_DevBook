const connection = require('../../config/db');


class User {
    static create(name, email, hashedPass,callback){
        const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
        connection.query(sql,[name, email, hashedPass], callback);
    }

    static findByemail(email, callback){
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [email], callback);
    }
}

module.exports = User;