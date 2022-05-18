const {Schema, model, Types} = require('mongoose')

const Theme = new Schema({
    name: {type: String},
    author: {type: Types.ObjectId, ref: 'User'},
    quizzes: {type: Types.ObjectId, ref: 'Quiz'}
})

module.exports = model('Theme', Theme)
