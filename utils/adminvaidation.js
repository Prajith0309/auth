const Authmodel = require('../models/authmodel')


exports.isAdmin = async (req,res,next) =>{
try{
    // let payload = req.body;
    let insign = await Authmodel.findOne({_id: req.params.userId})
    if(!insign) return res.status(404).send('the email is not registerd')
    if(insign.flag === 0){
       return res.status(403).send("admin resources access denied")
    }
    next();
}catch(err){
   res.send(err)
}
}