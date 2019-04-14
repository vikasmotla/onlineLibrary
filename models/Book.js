const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  qr_code:{
    type:String,
    required:true
  },
  book_code:{
    type:String,
    required:true
  }
});

module.exports = Book = mongoose.model('book', BookSchema);
