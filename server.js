const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('/public'));

app.get('/notes', (req,res) => res.sendFile(path.join(__dirname,'notes.html')));

app.get('*', (req,res) => res.sendFile('index.html'));

app.get('/api/notes', (req,res) => res.json('db.json'));

app.post('/api/notes', (req,res) => res.json())

app.listen(PORT)