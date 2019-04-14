const express = require('express');
const router = express.Router();

const Book = require('../../models/Book');


router.get('/', (req, res) => {
  Book.find()
  .then(books =>{
    res.json(books)
  })
  .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  Book.findOne({
      book_code: req.body.book_code
    })
    .then(book => {
      if (book) {
        return res.status(400).json({
          error: "Book with this QR code already exists"
        });
      }
      const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        qr_code: req.body.qr_code,
        price: req.body.price,
        book_code:req.body.book_code
      });

      newBook
        .save()
        .then(book => {
          res.json(book);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
