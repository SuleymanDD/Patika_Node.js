const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv")

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then("Db Connected!").catch((e) => console.log(e));

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("index");
})

app.listen(process.env.PORT || 4000, () => {
    console.log("Sunucu başlatıldı...");
})

