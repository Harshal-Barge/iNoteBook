const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const {body , validationResult} = require('express-validator');

router.post('/addnotes',fetchuser,[
    body('title','please enter valid title').isLength({min:3}),
    body('description','please enter valid description').isLength({min:3})
],async (req,res)=>{
    try{
    const {title, description, tag} = req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({error:errors.array()})
    } 
    const notes = new Note({
        title,
        description,
        tag,
        user:req.user.id
    })
    const savednote = await notes.save()
    return res.json(savednote)
    }catch(error){
        console.log(error.message)
        return res.status(500).send("some error occured")
    }
});


router.get('/fetchnotes',fetchuser,async (req,res)=>{
    try{
    const notes =await Note.find({user:req.user.id})
    return res.json(notes)
    }catch(error){
        console.log(error.message)
        return res.status(500).send("some error occured")
    }
});

router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    try{
        const {title,description,tag} = req.body
        let newnotes = {};
        if(title){newnotes.title=title}
        if(description){newnotes.description=description}
        if(tag){newnotes.tag=tag}
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not allowed")   
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newnotes},{new:true})
        return res.json(note)
        
    }catch(error){
        console.log(error.message)
        return res.status(500).send("some error occured")
    }
})

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not allowed")   
        }
        note = await Note.findByIdAndDelete(req.params.id);
        return res.json({"success":"note deleted successfully"})
    }catch(error){
        console.log(error.message)
        return res.status(500).send("some error occured")
    }

});
module.exports = router;