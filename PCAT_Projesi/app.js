
const express = require('express');
const path = require('path');
const ejs = require('ejs')
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine","ejs");

app.get('/', (req,res) => {
    res.render('index');
});
app.get('/about', (req,res) => {
    res.render('about');
});
app.get('/addPhoto', (req,res) => {
    res.render('addPhoto');
});
app.post('/photos', (req,res) => {
    console.log(req.body);
    res.redirect("/");
});



const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} numaralı portta başlatıldı..`);
});