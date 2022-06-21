const {Schema, model, Types} = require('mongoose')

const Theme = new Schema({
    name: String,
    picture: String,
    slug: {type: String, unique: true},
    author: {type: Types.ObjectId, ref: 'User'},
    quizzes: [{type: Types.ObjectId, ref: 'Quiz'}],
});

module.exports = model('Theme', Theme)
