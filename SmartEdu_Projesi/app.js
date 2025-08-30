const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

const app = express();

mongoose.connect("mongodb://localhost/smartedu-db");

// Template Engine
app.set("view engine","ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.use("/",pageRoute);
app.use("/courses",courseRoute);

const PORT=3000;
app.listen(PORT, () => {
    console.log(`${PORT} Numarali portta sunucu calisiyor.`)
});