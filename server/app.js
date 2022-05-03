const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const mongoose= require("mongoose");
const bcrypt= require("bcrypt");
const jwt=require('jsonwebtoken');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
  
mongoose.connect("mongodb://localhost:27017/result"); // for connection with local database.

const MarksSchema={
        Student: String,
        UID: String,
        DBMS : Number,
        Computer_networks : Number,
        web_dev:Number,
        operating_system:Number,
        DSA : Number
}

const loginSchema={
    Email: String,
    Password: String
}

const Result = mongoose.model("marks",MarksSchema);
const Signup=mongoose.model("creds",loginSchema);

const maxAge=3*24*60*60;

const createtoken=(id)=>{
    return jwt.sign({id},'ragnar',{
        expiresIn: maxAge
    });
}

app.post("/addmarks",(req,res)=>{
    console.log("post recieved");
    const mark=new Result({
        Student:req.body.Student,
        UID:req.body.UID,
        DBMS:req.body.DBMS,
        Computer_networks:req.body.Computer_networks,
        web_dev:req.body.web_dev,
        operating_system:req.body.operating_system,
        DSA:req.body.DSA
    }); 
     mark.save();
});

app.post("/signup", async (req,res)=>{
    const salt=await bcrypt.genSalt(10);
    const user=new Signup(req.body);
    user.Password=await bcrypt.hash(user.Password,salt);
    user.save();
    res.send("user registered");
});


app.get('/',(req,res)=>{
    res.send("welcome")
});

app.get('/details',(req,res)=>{
    console.log("get recieved")
    Result.find(function(err, founddetails){
        console.log(founddetails)
        res.send(founddetails);
     });
});

app.get('/login',async (req,res)=>{
    const pass=req.query.Password;
   // console.log(pass);
   Signup.findOne((err,creds)=>{
        console.log(creds);
        if(creds.length !==0){
             bcrypt.compare(pass,creds.Password,function(err,auth){
                    if(auth){
                        console.log("authenticated");
                    } 
             })
        }
   });
});

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));