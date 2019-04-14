const express = require('express');
const router = express.Router();

const Library = require('../../models/Library');


router.get('/', (req, res) => {
  Library.find()
    .populate('books.bookRef')
    // .populate('library_admin')
    .then(libraries => {
      res.json(libraries)
    })
    .catch(err => console.log(err));
});

router.get('/libraryDetail/:lib_id', (req, res) => {
  Library.findOne({_id: req.params.lib_id})
    .then(library => {
      res.json(library)
    })
    .catch(err => console.log(err));
});


router.post('/', (req, res) => {
  Library.findOne({
      library_code: req.body.library_code
    })
    .then(library => {
      if (library) {
        return res.status(400).json({error:"library with this ID already exists"})
      }

      const newLibrary = new Library({
        name:req.body.name,
        library_code:req.body.library_code,
        library_admin:req.body.library_admin
      });

      newLibrary.address = {}
      if (req.body.street) newLibrary.address.street = req.body.street;
      if (req.body.city) newLibrary.address.city = req.body.city;
      if (req.body.state) newLibrary.address.state = req.body.state;
      if (req.body.pincode) newLibrary.address.pincode = req.body.pincode;
      if (req.body.country) newLibrary.address.country = req.body.country;

      newLibrary
      .save()
      .then(library=>{
        res.json(library);
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post('/addBooks/:lib_id', (req, res) => {
  Library.findOne({_id: req.params.lib_id})
    .then(library => {
      if (!library) {
        return res.status(400).json({error:"library not found"});
      }
      // library.books = [];
      const bookIds = req.body.bookIds.split(",");
      for (var i = 0; i < bookIds.length; i++) {
        let bookObj = {
          bookRef:bookIds[i]
        }
        library.books.push(bookObj);
      }
      library
      .save()
      .then(library=>{
        res.json(library)
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// router.post('/',(req,res)=>{
//
// });

// router.post('/addStaff/:lib_id', (req, res) => {
//   Library.findOne({_id:req.params.lib_id})
//   .then(library=>{
//     if (!library) {
//       return res.json({error:"library not found"});
//     }
//     library.staff_members = req.body.staffIds.split(",");
//     library
//     .save()
//     .then(lib =>{
//       res.json(lib)
//     })
//     .catch(err => console.log(err));
//   })
//   .catch(err => console.log(err));
// });


module.exports = router;
