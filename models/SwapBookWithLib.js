const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SwapBookWithLibSchema = new Schema({
  libraryOne:{
    type:Schema.Types.ObjectId,
    ref:'library'
  },
  libraryTwo:{
    type:Schema.Types.ObjectId,
    ref:'library'
  },
  bookIdsOne:[{
    type:Schema.Types.ObjectId,
    ref:'book'
  }],
  bookIdsTwo:[{
    type:Schema.Types.ObjectId,
    ref:'book'
  }]
});

module.exports = SwapBookWithLib = mongoose.model('swapBookWithLib', SwapBookWithLibSchema);
