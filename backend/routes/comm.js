const router = require('express').Router();
const Comments = require('../model/Contact');




router.post('/comment',async (req, res) =>{
    
    
        const comment =  new Comments({
        name: req.body.name,
        email: req.body.email,
        message : req.body.message
    });
    
    try{
        const savedComment =await comment.save();
        res.send({comment:comment._id});
    }catch(err){
        res.status(400).send(err);
    }
});






