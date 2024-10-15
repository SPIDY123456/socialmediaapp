const mongoose =  require('mongoose');

const storySchema = new mongoose.Schema({

    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    username:{type:String},
    content:{type:String,required:true},
    profilePicture: { type: String},
    createdAt:{type: Date, default:Date.now, expires:86400}

});

const Story = mongoose.model('Story',storySchema);

module.exports = Story;