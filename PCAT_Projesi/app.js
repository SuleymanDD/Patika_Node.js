const express = require('express');
const fileUpload = require("express-fileupload");
const path = require('path');
const ejs = require('ejs');
const fs = require("fs");
const Photo = require("./models/Photo");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/pcat-test-db");

// MiddleWears
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload());

// Template Engine
app.set("view engine","ejs");

app.get('/', async (req,res) => {
    const photos =  await Photo.find({}).sort("-dateCreated");
    res.render('index', {
        photos
    });
});
app.get("/photos/:id", async (req,res) => {
    const photo = await Photo.findById(req.params.id);
    res.render("photo",{
        photo
    });
});
app.get('/about', (req,res) => {
    res.render('about');
});
app.get('/addPhoto', (req,res) => {
    res.render('addPhoto');
});

app.post('/photos', async (req,res) => {

    const uploadDir = "public/uploads/";
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }       

    let uploadImage=req.files.image;
    let uploadPath=__dirname+"/public/uploads/"+uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: "/uploads/" + uploadImage.name
        });
        res.redirect("/")
    });
});



const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} numaralı portta başlatıldı..`);
});