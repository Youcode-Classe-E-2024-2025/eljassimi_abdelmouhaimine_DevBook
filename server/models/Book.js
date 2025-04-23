const connection = require('../../config/db');

class Book{
    static getAll(callback){
        const sql = 'SELECT * FROM books';
        connection.query(sql,callback);
    }

    static add(title, author, callback){
        const sql = 'INSERT INTO books (title, author) VALUE (?,?)';
        connection.query(sql, [title,author], callback);
    }

    static loan(id, user_id, callback){
        const sql = 'UPDATE books SET is_loaned = TRUE, user_id = ? WHERE id = ?';
        connection.query(sql, [user_id, id], (err, result) => {
            if(err) return callback(err);

            const loanSQL = 'INSERT INTO user_loans (user_id, book_id) VALUE (?,?)';
            connection.query(loanSQL, [user_id, id], callback);
        });
    }

    static isloaned(id, callback){
        const sql = 'SELECT is_loaned FROM books where id = ?';
        connection.query(sql, [id], callback);
    }

    static return(id,user_id,callback){
        const sql = 'UPDATE books SET is_loaned = FALSE, user_id = NULL WHERE id = ? AND user_id = ?';
        connection.query(sql, [id,user_id], callback);
    }

    static getLoanedBooks(user_id,callback){
        const sql = `SELECT *, ul.loaned_at FROM books b
                    JOIN user_loans ul on b.id = ul.book_id
                    WHERE ul.user_id = ?
        `;
        connection.query(sql, [user_id], callback);
    }
}

module.exports = Book;