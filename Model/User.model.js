const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    gender:String
},{
    versionKey:false
});

const UserModel = mongoose.model("nemassfulluser",userSchema);

module.exports = {
    UserModel
}