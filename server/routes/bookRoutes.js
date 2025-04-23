const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const vevrifyToken = require('../middleware/authMiddleware');

router.get('/', vevrifyToken, bookController.getAllBooks);
router.post('/add', vevrifyToken, bookController.addBook);
router.put('/loan/:id', vevrifyToken, bookController.loanBook);
router.put('/return/:id', vevrifyToken, bookController.returnBook);
router.get('/getloans', vevrifyToken, bookController.LoanedBooks);

module.exports = router;