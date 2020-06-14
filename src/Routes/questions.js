const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
module.exports = router

// create one quiz question
router.post('/api/checknoder/questions/create', async (req, res) => {
    try {
        const { description ,alternatives,correct} = req.body

        const question = await Question.create({
            description,
            alternatives,
            correct,
            type:'question'
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
// get all quiz questions
router.get('/api/checknoder/questions', async (req, res) => {
    try {
        const questions = await Question.find({type:'question'},{type:0,correct:0})
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
//check answer
router.post('/api/checknoder/questions/checkanswer',async(req,res)=>{
    try {
        const {  _id } = req.body

        let question = await Question.findOne({_id},{correct:1,tips:1})

        if(!question){
            return res.status(500).json({"error":"question doesn't exist"})
        }else{
           return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})















// get one quiz question
router.get('/api/checknoder/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.findOne({_id})
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
// update one quiz question
router.put('/api/checknoder/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const { description, alternatives } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives
            })
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


// delete one quiz question
router.delete('/api/checknoder/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})