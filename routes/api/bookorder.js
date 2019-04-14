const express = require('express');
const router = express.Router();

const BookOrder = require('../../models/BookOrder');


router.get('/',(req,res)=>{
  BookOrder.find()
  .populate('ordered_books')
  .then(orders=>{
    return res.json(orders)
  })
  .catch(err=>console.log(err));
});

router.post('/',(req,res)=>{

  const newOrder = new BookOrder({
    user:req.body.user,
    library:req.body.library,
    ordered_books:req.body.ordered_books.split(",")
  });

  newOrder.save()
  .then(order=>{
    res.json(order)
  })
  .catch(err=>console.log(err));

});

module.exports = router;
