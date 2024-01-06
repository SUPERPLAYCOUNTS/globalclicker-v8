const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

let data = fs.readFileSync(path.join(__dirname, 'clicks.json'), 'utf8');
let clicks = JSON.parse(data);

app.get('/click', (req, res) => {
    res.json({ clicks: clicks.globalclick });
});

app.post('/clicks', (req, res) => {
    clicks.globalclick++;
    fs.writeFile(path.join(__dirname, 'clicks.json'), JSON.stringify(clicks), 'utf8', function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            res.json(clicks);
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000/')
});