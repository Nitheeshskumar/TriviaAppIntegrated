const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
const User = require('../models/Users')
module.exports = router


// create user
router.put('/api/checknoder/admin/user/create', async (req, res) => {
    try {

        const { name,email,password } = req.body

        let user = await User.findOne({email})

        if(!user){
            user = await User.create({
                name,email,password
            })
            return res.status(201).json(user)
        }else{

            return res.status(200).json(user)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

