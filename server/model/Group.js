const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name :{type:String,required:true},
    members :[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    profilePicture:{type:String},
    messages:[{
        sender: {type:String,required:true},
        profilePicture: {type:String},
        content:{type:String,required:true},
        timestamp: {type: Date, default: Date.now},

}],
createdAt: {type:Date,default:Date.now},
    
});

module.exports = mongoose.model('Group',groupSchema);