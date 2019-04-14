const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SwapBookWithUserSchema = new Schema({
  library:{
    type:Schema.Types.ObjectId,
    ref:'library'
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'user'
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

module.exports = SwapBookWithUser = mongoose.model('swapBookWithUser', SwapBookWithUserSchema);
