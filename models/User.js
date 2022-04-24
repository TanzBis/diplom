const {Schema, model} = require('mongoose')
const {isBoolean} = require("validator");


const User = new Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    roles: [{type:String, ref:'Role'}],
    isActivated: {type: Boolean, default: false },
    activationLink: {type: String}
})



module.exports = model('User', User)