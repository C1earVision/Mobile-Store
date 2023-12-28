const mongoose = require('mongoose')

const Orders = new mongoose.Schema({
  user_id:{
    type:String,
    requierd:[true, 'Please provide user_id'],
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