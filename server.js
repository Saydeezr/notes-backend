const express = require('express');
const fs = require('fs')
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

//making 'public' folder accesible to client 
app.use(express.static('public'));
app.use(express.json());

//brings user to next page
app.get('/notes', (req,res) => res.sendFile(path.join(__dirname,'./public/notes.html')));

app.get('/api/notes', (req,res) => res.json('db.json'));

app.post('/api/notes', (req,res) => {
    let notes = require('./db/db.json')
    const { v4: uuidv4 } = require('uuid');

    let newNote = {
        ...req.body,
        id: uuidv4
        }
    
    notes.push(newNote);
    //write new array into db.json
   fs.writeFile(notes, JSON.stringify(newNote), (err) =>{
    if(err) {
        console.error(err)
    } else {
        res.json(newNote)
    }
   })
});

app.get('*', (req,res) => res.sendFile(path.join(__dirname,'./public/index.html')));

app.listen(PORT, () => {
    console.log(`server turned on`)
})