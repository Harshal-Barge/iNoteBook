const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_secret = "inotebooku$er";
const router = express.Router();
const {body, validationResult} = require('express-validator');


//signup route 
router.post('/signup',[
    body('name').isLength({ min: 3}),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],async (req,res)=>{
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array(),
        status:"validation-error"});
    }
    let user = await User.findOne({"email":req.body.email})
    if(user){
        return res.status(400).json({"error":"user with this email already exist",
        "status": "error"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
    })
    let payload = {
        user:{id:user.id}
    }
    const auth_token = JWT.sign(payload , JWT_secret);
    return res.json({"auth_token":auth_token,
    "status": "ok" })
} catch(error){
    console.error(error.message)
    res.status(500).send("some error occured")
}
});


//login route
router.post('/login',[
    body('email').isEmail(),
    body('password').exists()
],async (req,res)=>{
    try{
    let success = false;
    let error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email , password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({success,errors: 'please enter valid credentials'});
    }
    
    const passcompare = await bcrypt.compare(password , user.password);
    if(!passcompare){
        return res.status(400).json({success,errors: 'please enter valid credentials'});
    }
    const payload = {
        user:{id:user.id}
    }
    const auth_token = JWT.sign(payload , JWT_secret);
    success = true
    return res.send({success,auth_token})
}catch (error){
    console.log(error.message)
    res.status(500).send("some error occured")
}
});


//getuser route
router.post('/getuser', fetchuser, async (req, res)=>{
    try{
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
    }catch(error){
        console.log(error.message)
        res.status(500).send("some error occured")
    }
});

module.exports = router;