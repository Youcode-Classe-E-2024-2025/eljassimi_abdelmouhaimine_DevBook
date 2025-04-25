const Book = require('../models/Book');

exports.getAllBooks = (req,res) =>{
    Book.getAll((err, results) => {
        if(err) return res.status(500).json({error: 'Data error'});
        res.json(results);
    });
};

exports.addBook = (req, res) => {
    const {title, author} = req.body;

    Book.add(title, author, (err, results) => {
        if(err) return res.status(500).json({error: 'Could not add book'});

        res.json({message: 'book added'});
    });
};

exports.loanBook = (req, res) => {
    console.log('hhhhhhhhhhhhhhhhhhhhh');
    const { id } = req.params;
    const userId = req.userId;
    console.log("book id : ",id, "user id : ", userId);

    Book.isloaned(id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error during loan check' });

        if (result.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        console.log("Book status:", result[0]);

        if (result[0].status != 'Disponible') {
            return res.status(400).json({ message: 'Book already loaned' });
        }

        Book.loan(id, userId, (err, results) => {
            if (err) return res.status(500).json({ error: 'Error during loan phase' });

            res.json({ message: 'Book loaned with success' });
        });
    });
};

exports.returnBook = (req, res) => {
    const {id} = req.params;
    const userId = req.userId;

    Book.return(id,userId,(err, result) => {
        if(err) return res.status(500).json({error: 'error during return'});

        if(result.affectedRows === 0){
            return res.status(403).json({error : 'you can\'t return the book'});
        }

        res.json({message: 'Book returned with success'});
    });
};

exports.LoanedBooks = (req, res) =>{
    const userId = req.userId;

    Book.getLoanedBooks(userId, (err, results) => {
        if(err) return res.status(500).json({error: 'error during getting loaned books'});
        
        res.json(results);
    })
};