const {Schema, model, Types} = require('mongoose')
const Quiz = require("../models/Quiz")

const Theme = new Schema({
    name: String,
    picture: String,
    author: {type: Types.ObjectId, ref: 'User'},
    quizzes: Quiz,
});

module.exports = model('Theme', Theme)
