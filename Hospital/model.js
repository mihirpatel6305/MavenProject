const mongoose = require('mongoose');
const hospitalSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    location:{
        type:String,
    },
},
{ timestamps: true }
)
module.exports=mongoose.model("Hospital",hospitalSchema);