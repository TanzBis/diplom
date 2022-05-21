const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    question: {type: String, required: true},
    theme: {type: Types.ObjectId, ref: 'Theme'},
    options: [{type: Types.ObjectId, ref: 'Option'}],
});

module.exports = model('Quiz', schema)