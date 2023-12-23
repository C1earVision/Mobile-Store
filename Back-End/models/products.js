const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
  imges:{
    img_1:{
      type:String,
      required: [true, 'Please provide the image for the book'],
    },
    img_2:{
      type:String,
    },
    img_3:{
      type:String,
    }
  },
  name:{
    type:String,
    required: [true, 'Please provide the name of the book'],
    unique:true,
    minlength:5,
  },
  price:{
    type:Number,
    default: 30
  },
  company:{
    type:String,
    required: [true, 'Please provide the genres for the book'],
  },
  description:{
    type:String,
    required: [true, 'Please provide the discreption of the Phone'],
    minlength:5,
  },
  specifications:{
    body:{
      dimensions:{
        type:String,
        required: [true, 'Please provide the dimensions of the phone']
      },
      weight:{
        type:Number,
        required: [true, 'Please provide the weight of the phone']
      },
      build:{
        type:String,
        required: [true, 'Please provide the build of the phone']
      },
      sim:{
        type:String,
        required: [true, 'Please provide the sim of the phone']
      }
    },
    display:{
      type:{
        type:String,
        required: [true, 'Please provide the type of the display']
      },
      size:{
        type:String,
        required: [true, 'Please provide the size of the display']
      }
    },
    memory:{
      type:Number,
      required: [true, 'Please provide the memory']
    },
    mainCamera:{
      features:{
        type:String,
        required: [true, 'Please provide the features of the camera']
      },
      video:{
        type:String,
        required: [true, 'Please provide the video specs of the camera']
      }
    },
    selfieCamera:{
      features:{
        type:String,
        required: [true, 'Please provide the features of the camera']
      },
      video:{
        type:String,
        required: [true, 'Please provide the video specs of the camera']
      }
    },
    battery:{
      type:Number,
      required: [true, 'Please provide the power of the battery']
    }
  },
  stars:{
    type: Number,
    default: 0.0
  },
  comments: {
    type: Array,
    default: []
  },
  createdAt:{
    type:Date,
    default: Date.now()
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'users',
    requierd:[true, 'Please provide user']
  },
  wishListedBy:{
    type:Array,
    default: []
  }
})



module.exports = mongoose.model('Products', ProductsSchema)