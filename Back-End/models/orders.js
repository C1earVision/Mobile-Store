const mongoose = require('mongoose')

const Orders = new mongoose.Schema({
  user_id:{
    type:String,
  },
  user_name:{
    type:String
  },
  user_email:{
    type:String
  },
  used:{
    type:Boolean
  },
  address:{
    street:{
      type:String
    },
    city:{
      type:String      
    },
    state:{
      type:String
    },
    zip_code:{
      type:Number
    }
  },
  item:{
    type:String
  },
  price:{
    type:Number
  },
  createdAt:{
    type:Date,
    default: Date.now()
  },
})



module.exports = mongoose.model('Orders', Orders)