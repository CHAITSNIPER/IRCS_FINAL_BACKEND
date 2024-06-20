const mongoose=require('mongoose');

const DonatorSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_number:{
        type: Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    time:{
        type:Date,
        required:true,
        default:Date.now
    }
});

module.exports = mongoose.model("Donator",DonatorSchema);