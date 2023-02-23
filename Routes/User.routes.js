const express =  require("express");

const {UserModel} = require("../Model/User.model");

const userRouter = express.Router();

const bcrypt = require("bcrypt");

const jwt=require("jsonwebtoken");

userRouter.get("/",(req,res)=>{
    res.send("USER ROUTER")
})

userRouter.post("/register", async (req,res)=>{
    const {name,email,pass,gender}=req.body
    try{
        bcrypt.hash(pass, 5, async (err, hash)=>{
            if(err){
                console.log("err Bcrypt",err)
            }
            const user=new UserModel({name,email,pass:hash,gender})
            await user.save()
            res.status(200).send({message: "registration successful" })
        });
    }catch(err){
        res.send("Error in registering the user")
        // console.log(err)
    }
});

userRouter.post("/login",async (req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
        bcrypt.compare(pass, user[0].pass, function(err, result) {
        if(result){
        const token = jwt.sign({ userID:user[0]._id }, 'masai');
        res.send({"msg":"Login Successfully","token":token})
        } else {res.send("Wrong Credentials")}
        });
        } else {
        res.send("Wrong Credentials")
        }
        } catch(err){
        res.send("Something went wrong")
        console.log(err)
        }
})


module.exports = {
    userRouter
}