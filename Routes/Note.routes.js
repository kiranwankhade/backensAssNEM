const express = require("express");
const { NoteModel } = require("../Model/Note.model");

const noteRouter = express.Router();


noteRouter.get("/",async (req,res)=>{
   const note = await NoteModel.find();
   res.send(note)
})


noteRouter.post("/create",async(req,res)=>{
    try{
        const payload = req.body;
        const note =  new NoteModel(payload);
        await note.save();
        res.send({"message":"created note"})
    }catch(err){
        res.send({"msg":"note Created","err":err.message})
    }


})

noteRouter.delete("/delete/:id",async (req,res)=>{
    const noteID =  req.params.id;
    await NoteModel.findByIdAndDelete(noteID);
    res.send({"msg":`note deleted with ${noteID}`})
})


noteRouter.patch("/update/:id",async(req,res)=>{
    let noteID = req.params['id'];
    const payload = req.body;
    try{
        const query = await NoteModel.findByIdAndUpdate({_id:noteID},payload);
        res.send({"msg":"Data get updated"})
    }catch(err){
        console.log('err:', err)
        res.send({"msg":"Something Went wrong\n"});
    }
})

module.exports = {
    noteRouter
}