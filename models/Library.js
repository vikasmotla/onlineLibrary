const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  library_code: {
    type: String,
    required: true
  },
  library_admin: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  books: [{
    bookRef: {
      type: Schema.Types.ObjectId,
      ref: 'book'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  address:{
        street:{
          type: String
        },
        city:{
          type: String
        },
        state:{
          type: String
        },
        pincode:{
          type: Number
        },
        country:{
          type: String
        }
  }
});


module.exports = Library = mongoose.model('library', LibrarySchema);
