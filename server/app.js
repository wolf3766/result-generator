const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// const URL="mongodb+srv://skc3766:1234@cluster0.wsew7.mongodb.net/Result?retryWrites=true&w=majority";

mongoose.connect("mongodb://localhost:27017/result")


const MarksSchema = {
    Student: String,
    UID: String,
    attendance: Number,
    externalmarks: Number,
    internalmarks: Number,
    grade: Number
}

const Result = mongoose.model("marks", MarksSchema);

app.post("/addmarks", (req, res) => {
    const mark = new Result({
        Student: req.body.Student,
        UID: req.body.UID,
        attendance: req.body.attendance,
        externalmarks: req.body.externalmarks,
        internalmarks: req.body.internalmarks,
        grade: ((Number(req.body.attendance) + Number(req.body.externalmarks) + Number(req.body.internalmarks)) / 100).toFixed(1)
    });
    mark.save();
});


app.get('/', (req, res) => {
    res.send("welcome")
});

app.get('/details', (req, res) => {
    Result.findOne({ UID: req.query.UID }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
