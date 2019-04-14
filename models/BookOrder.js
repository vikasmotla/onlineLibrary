const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookOrderSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  ordered_books:[{
    type: Schema.Types.ObjectId,
    ref: 'book'
  }],
  order_status:{
    type:String,
    enum: ['ordered', 'outForDelivery', 'delivered','returned'],
    default:'ordered'
  },
  date:{
    type:Date,
    default:Date.now
  },
  library:{
    type: Schema.Types.ObjectId,
    ref: 'library'
  }
});

module.exports = BookOrder = mongoose.model('bookOrder', BookOrderSchema);
