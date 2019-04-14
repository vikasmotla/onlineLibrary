const express = require('express');
const router = express.Router();

const SwapBookWithUser = require('../../models/SwapBookWithUser');
const SwapBookWithLib = require('../../models/SwapBookWithLib');


router.post('/withuser', (req, res) => {
  const newSwapWithUser = new SwapBookWithUser({
    library: req.body.library,
    user: req.body.user,
    bookIdsOne: req.body.bookIdsOne.split(","),
    bookIdsTwo: req.body.bookIdsTwo.split(",")
  });
  newSwapWithUser
    .save()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

router.post('/withlibrary', (req, res) => {
  console.log(req.body);
  const newSwapWithLib = new SwapBookWithLib({
    libraryOne: req.body.libraryOne,
    libraryTwo: req.body.libraryTwo,
    bookIdsOne: req.body.bookIdsOne.split(","),
    bookIdsTwo: req.body.bookIdsTwo.split(",")
  });
  newSwapWithLib
    .save()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});


module.exports = router;
