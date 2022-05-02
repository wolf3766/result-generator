const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const mongoose= require("mongoose");
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

const Result = mongoose.model("marks",MarksSchema);

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

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));