const {Schema, model, Types} = require('mongoose')



const schema = new Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    roles: [{type:String, ref:'Role'}],
    themes: [{type: Types.ObjectId, ref: 'Theme'}]
})



module.exports = model('User', schema)