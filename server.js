const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3000;
const app = express();

//making 'public' folder accesible to client 
app.use(express.static('public'));
app.use(express.json());

//brings user to next page
app.get('/notes', (req,res) => res.sendFile(path.join(__dirname,'./public/notes.html')));

app.get('/api/notes', (req,res) => res.json('db.json'));

app.post('/api/notes', (req,res) => {
    let noteData = require('./db/db.json')
    //save the data to a vaiable
    let newNote = (req.body)
    //add unique id
    
    //.push() new note to noteData variable 
    noteData.push(newNote);
    //write new array into db.json

    //respond with new note

})

app.get('*', (req,res) => res.sendFile(path.join(__dirname,'./public/index.html')));

app.listen(PORT, () => {
    console.log(`server turned on`)
})