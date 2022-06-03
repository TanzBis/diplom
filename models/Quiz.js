const {Schema, model, Types} = require('mongoose')
const Option = require("../models/Option")

const schema = new Schema({
    question: {type: String},
    theme: {type: Types.ObjectId, ref: 'Theme'},
    options: Option,
});

module.exports = model('Quiz', schema)