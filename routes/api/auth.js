const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//test url
router.get('/allUsers', (req, res) => {
  User.find()
  .then(users=>{
    res.json(users)
  }).catch(err => console.log(err));

});


//to register a new user
router.post('/register', (req, res) => {

  User.findOne({username:req.body.username})
  .then(user=>{
    if (user) {
      return res.status(400).json({error:"username already exists"});
    }

    const newUser = new User({
      username: req.body.username,
      first_name: req.body.first_name,
      email: req.body.email,
      password: req.body.password
    });

    if (req.body.is_customer) newUser.is_customer = req.body.is_customer;
    if (req.body.is_customer) newUser.is_customer = req.body.is_customer;
    if (req.body.is_library_admin) newUser.is_library_admin = req.body.is_library_admin;
    if (req.body.is_staff) newUser.is_staff = req.body.is_staff;

    //Encrypt password using bcrypt
    var saltRounds = 10;
    var myPlaintextPassword = newUser.password;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(savedUser => res.json(savedUser))
          .catch(err => console.log(err));
      });
    });



  })
  .catch(err => console.log(err));


});



module.exports = router;
