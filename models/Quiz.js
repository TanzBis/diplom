const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    question: {type: String, required: true},
    optionOne:{type: String, maxlength: 1000, required: true},
    optionTwo:{type: String, maxlength: 1000, required: true},
    optionThree:{type: String, maxlength: 1000, required: true},
    optionFour:{type: String, maxlength: 1000, required: true},
    author: {type: Types.ObjectId, ref: 'User'},
    sound: {type: String, required: false},
    picture: {type: String, required: false}
})

module.exports = model('Quiz', schema)