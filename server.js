const express = require('express');
const fs = require('fs')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;
const app = express();


//use of middleware
app.use(express.static('public'));
app.use(express.json());


//routes
app.get('/notes', (req,res) => res.sendFile(path.join(__dirname,'./public/notes.html')));


app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err)
            res.status(500).send('Error reading the file');
        } else { 
            const notes = JSON.parse(data);
            res.json(notes)
        }
    })
});


app.post('/api/notes', (req,res) => {
    let notes = require('./db/db.json')
    let newNote = {
        ...req.body,
        id: uuidv4
        }
    
    notes.push(newNote);

   fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
    if(err) {
        console.error(err)
    } else {
       return res.json(notes)
    }
   })
});

app.delete('/api/notes/:id', (req,res) => {
    const noteId = req.params.id;
    console.log(noteId)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
          console.error(err)
          res.status(500).send('Error reading the file')
        } else {
            const notes = JSON.parse(data);
            const result = notes.filter((note) => note.id != req.params.id);
            fs.writeFile('./db/db.json', JSON.stringify(result), (err) => {
                console.error(err);
                return res.json(result)
            })
        }
    })
});


app.get('*', (req,res) => res.sendFile(path.join(__dirname,'./public/index.html')));


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})