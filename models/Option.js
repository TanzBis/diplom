const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    text: {type: String},
    sound: {type: String, default: ''},
    picture: {type: String, default: ''},
    quiz: {type: Types.ObjectId, ref: 'Quiz'}
})

module.exports = model('Option', schema)