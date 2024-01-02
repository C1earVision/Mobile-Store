const mongoose = require('mongoose')

const Orders = new mongoose.Schema({
  user_id:{
    type:String,
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
  items:{
    type:Array,
    default:[]
  }
})



module.exports = mongoose.model('Orders', Orders)