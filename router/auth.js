const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Authmodel = require('../models/authmodel')

const router = express.Router()

router.post('/signup',async(req,res)=>{
    try{
        let payload = req.body;
        const saltRounds = 5;
        const salt = await bcrypt.genSalt(saltRounds);
        
        payload.hashedPassword = await bcrypt.hash(payload.password,salt)

                let auth = new Authmodel(payload);
                await auth.save();
                console.log('auth saved');
                res.send(auth);
    }catch(err){
        console.log('Error:', err)
        res.status(500).send('Internal Server Error');
    }
})

router.post('/signin',async(req,res)=>{

    try{
        let payload = req.body;
        let insign = await Authmodel.findOne({email: payload.email})
            if(!insign) return res.status(404).send('the email is not registerd')
            const validpass = await bcrypt.compare(payload.password,insign.hashedPassword)
            if(validpass){
                const token = jwt.sign({_id:insign._id}, 'secretkey')
                        res.cookie(
                            't',
                            token,
                            {
                                expire: new Date(Date.now() + 9999 * 1000),
                             },
                        )
                        res.status(200).json({token,user: {
                            _id: insign._id,
                            name: insign.name,
                            email: insign.email,
                          }})
                    }
            else{
                return res.send("invalid userid or password")
            }
    }catch(err){
        console.log(err)
    }
})

router.get('/signout',(req,res)=>{
    res.clearCookie('t');
    res.send('successfully signedout')
})

module.exports = router;