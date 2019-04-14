const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  first_name:{
    type:String,
    required:true
  },
  last_name:{
    type:String
  },
  email:{
    type:String,
    required:true
  },
  is_staff:{
    type:Boolean,
    default:false
  },
  is_library_admin:{
    type:Boolean,
    default:false
  },
  is_superuser:{
    type:Boolean,
    default:false
  },
  is_customer:{
    type:Boolean,
    default:false
  }
});

module.exports = User = mongoose.model('user', UserSchema);
