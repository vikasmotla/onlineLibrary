const express = require('express');
const router = express.Router();

const Book = require('../../models/Book');
const BookOrder = require('../../models/BookOrder');
const Library = require('../../models/Library');
const SwapBookWithLib = require('../../models/SwapBookWithLib');
const SwapBookWithUser = require('../../models/SwapBookWithUser');
const User = require('../../models/User');

router.post('/getSwappedBooks', (req, res) => {
  if (req.body.withUser) {
    if (req.body.getAll) {
      console.log('heetrrrrrrrr');
      SwapBookWithUser
        .find()
        .then(result =>{
          console.log('hereeee');
           res.json(result)
           res.end()
        })
        .catch(err => console.log(err))
    }
    if (req.body.getParticular) {
      SwapBookWithUser
        .findOne({
          user: req.body.getParticular
        })
        .then(result =>{
           res.json(result)
           res.end()
        })
        .catch(err => console.log(err))
    }
  }
  if (req.body.withLibrary) {
    if (req.body.getAll) {
      SwapBookWithLib
        .find()
        .then(result =>{
           res.json(result)
        })
        .catch(err => console.log(err))
    }
    if (req.body.getParticular) {
      SwapBookWithLib
        .findOne({

          $or: [
            { libraryOne: req.body.getParticular },
            { libraryTwo: req.body.getParticular }
          ]

        })
        .then(result =>{
           return res.json(result)
        })
        .catch(err => console.log(err))
    }

  }
  //  res.status(400).json({
  //   error: "not found"
  // });
});


module.exports = router;
