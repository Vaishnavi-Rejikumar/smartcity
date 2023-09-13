const router = require('express').Router();
const User = require('../model/User');
const Comment = require('../model/Comment');
const {registerValidate,loginValidate} = require('../validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register',async (req, res) =>{
    const {error }=registerValidate(req);
    if(error){
        return res.status(400).send(error.details[0].message);;
     }
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) {
        return res.status(400).send('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPswd= await bcrypt.hash(req.body.password,salt);
    
        const user =  new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPswd
    });
    
    try{
        const savedUser =await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }
});



router.post('/login',async (req,res)=>{
    const {error }=loginValidate(req);
    if(error){
        return res.status(400).send(error.details[0].message);;
     }
    const user = await User.findOne({email:req.body.email});
    if(!user) {
        return res.status(400).send('Email do not exist');
    }
    const validPswd = await bcrypt.compare(req.body.password,user.password)
    if(!validPswd){
        return res.status(400).send('invalid password');
    }
    //token
    

    res.send('Log in success!!');

});

router.post('/comment',async (req, res) =>{
    const comment =  new Comment({
    name: req.body.name,
    email: req.body.email,
    message : req.body.message
});

try{
    const savedComment = await comment.save();
    res.send({comment:comment._id});
}catch(err){
    res.status(400).send(err);
}
});



module.exports = router;