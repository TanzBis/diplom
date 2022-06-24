const {Schema, model} = require('mongoose')

const schema = new Schema({
    question: {type: String},
    correctAnswer: {type: String},
    options: [{
        text: {type: String, required: true},
        audio: {type: String, default: ''},
        picture: {type: String, default: ''},
    }],
});

module.exports = model('Quiz', schema)




