//express server
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import NotesData from './models/schema.js';

const port = 8080;
const app = express();

//middleware important
app.use(express.json()); //for post in json
app.use(cors());//for cros origin

//api

//post
app.post("/addNotes", (req, res) => {
    const note = new NotesData(req.body);
    try {
        note.save().then((data) => {
            res.status(200).send({
                data,
                message: "Note Added Successfully",
                success: true,
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//get
app.get("/getNotes", (req, res) => {
    try {
        //find() to find in the array of the json object
        NotesData.find({}).then((data) => {
            res.status(200).send({
                data,
                message: "Get data successfull",
                success: true,
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//put
app.put("/update/:id", (req, res) => {
    try {
        /*The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg,
        passing any options, and returns the found document (if any) to the callback.*/
        NotesData.findByIdAndUpdate(
            { _id: req.params.id },
            { title: req.body.title, text: req.body.text }
        ).then((data) => {
            res.status(200).send({
                data,
                message: "Note updated successfully",
                success: true,
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//delete
app.delete("/delete/:id", (req, res) => {
    try {
        //.params to access the whole json object 
        NotesData.findByIdAndDelete({ _id: req.params.id }).then(
            (data) => {
                res.status(200).send({
                    data,
                    message: "Note deleted Successfully",
                    success: true,
                });
            });
    } catch (err) {
        res.status(400).send(err);
    }
});

//creating server
app.listen(port, () => {
    console.log(`Listening to port:${port}.....`);
});

//connecting to mongodb
const link =
    "mongodb+srv://ankit:dutta@cluster0.t6vx0ij.mongodb.net/?retryWrites=true&w=majority";

async function mongoConnect() {
    await mongoose
        .connect(link, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to MongoDb");
        })
        .catch((err) => {
            console.error(err);
        });
}

mongoConnect();