const express = require('express')
const router = express.Router()
const User = require('../models/Users')
module.exports = router


// update score or create user
router.post('/api/checknoder/user/update', async (req, res) => {
    try {

        const { email, attempts, score ,responses} = req.body

        let user = await User.findOne({ email })

        if (!user) {
            console.log('no user')
            return res.status(500).json({user:"none"})
        } else {
            if (attempts) { user.attempts = attempts; }
            if (score) { user.score = score };
            // if(responses){ user.responses = responses}
            await user.save();
           await User.updateOne(
                { '_id': user._id },
                { $push: { responses: responses } }
             )
            return res.status(200).json({user:true})
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})
//login user
router.post('/api/checknoder/user/login', async (req, res) => {
    try {

        const { name, email, password } = req.body

        let user = await User.findOne({ email })
        console.log("aaha ")
        if (!user) {
            console.log("no exist")
            return res.status(201).json({ user: "none" })
        }
        else if (user.password === password) {
            if(user.email === 'trial@petta.in'){
                if (name) {
                    user.name = name+" Trial User";
                    await user.save()
                }else{
                    if(user.name !=="Trial User"){
                        user.name ="Trial User";
                        await user.save()
                    }
                }
            }else{
            if (name&& (name !== user.name)) {
                user.name = name;
                await user.save()
            }}
            console.log(user)
            let usertemp ={...user};
            let usertemp2=usertemp._doc
           delete usertemp2._id;
           delete usertemp2.password;
           delete usertemp2.type;
            return res.status(200).json(usertemp2)
        } else {
            return res.status(200).json({ user: "false" })
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

//get dashboard
router.get('/api/checknoder/user/dashboard', async (req, res) => {
    try {
        const user = await User.find({ type: 'user' },{name:1,email:1,attempts:1,score:1,_id:0})
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})
