const express =  require("express");
const { connection } = require("./db");

const { userRouter } = require("./Routes/User.routes");
const { noteRouter } = require("./Routes/Note.routes");
const { authenticate } = require("./Middleware/authenticate.middleware");

require('dotenv').config()

const app = express();
app.use(express.json());

// var cors = require('cors')
// app.use(cors())


app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use("/note",noteRouter)

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("connection");
     }catch(err){
        console.log("not connected");
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.port}`)
})