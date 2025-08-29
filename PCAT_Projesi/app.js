const express = require('express');
const fileUpload = require("express-fileupload");
const ejs = require('ejs');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const photoController = require("./controllers/photoController");
const pageController = require("./controllers/pageController");

require('dotenv').config();
const dbKey = process.env.DB_KEY;

const app = express();
const connectionPath =`mongodb+srv://sdemirel:${dbKey}@cluster0.q3pwia4.mongodb.net/pcat-db?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(connectionPath)
.then(()=> {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
})

// MiddleWears
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
    methods:["POST", "GET"]
}));

// Template Engine
app.set("view engine","ejs");

app.get('/', photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/addPhoto', pageController.getAddPhotoPage);
app.get("/photos/edit/:id", pageController.getEditPage);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Sunucu ${port} numaralı portta başlatıldı..`);
});