const express = require('express')

const Quotemodel = require('../models/quotesmodel')
const {isAdmin} = require('../utils/adminvaidation')
const router = express.Router()

router.get('/quotes', async(req,res)=>{
    let Quote = await Quotemodel.find({})
    
    if(Quote.length === 0)  return res.status(400).send('no qoutes added')
    res.send(Quote)
})

router.get('/quotes/:id', async(req,res)=>{
    let Quote = await Quotemodel.find({_id: req.params.id})
    if(!Quote) return res.status(400).send('id not found')
    res.send(Quote)
})


router.post('/add-quotes/:userId',isAdmin,async(req,res)=>{
    try{
        let payload = req.body;
        let quote = new Quotemodel(payload);
        await quote.save();
        console.log('quote saved');
        res.send(quote);
    }catch(err){
        console.log('Error:', err)
        res.status(500).send('Internal Server Error');
    }
})

router.put('/update-quotes/:id/:userId',isAdmin,async(req,res)=>{

    try{
      let updval =  await Quotemodel.findOneAndUpdate({_id: req.params.id},{$set: req.body}, {new:true})
      if(!updval) return res.status(400).send('id not found')
    //   await updval.save() ---> we have used findoneandupdate so there is no need to save
      res.send(updval);
    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
    // the id-----> is for quote id to update and usersid----> is for authenticated authorization
})

router.delete('/delete-quote/:userId',isAdmin,async (req,res)=>{
    // res.clearCookie('t');
    try{
        res.status(200).send('successfully deleted quote')
    }catch(err){
        res.send(err)
    }
    // here the params can be added to api endpoints as [id](of the quotes and userId is from the auth data stpred to give authenticated aurthorization) 
    // or else the particular cannot be deleted
})

module.exports = router;