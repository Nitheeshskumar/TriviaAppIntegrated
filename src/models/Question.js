const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: String,
    pack:{type:String,default:'Day1'},
    tips:{type:String},
    type:{
        type: String,
        default: 'question' },
    alternatives: [
        {type:String}
    ],
    correct:String
})

module.exports = mongoose.model('Question', QuestionSchema)