const express = require("express");

const app = express();

// Template Engine
app.set("view engine","ejs");

// Middlewares
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index",{
        page_name: "index"
    });
});
app.get("/about", (req,res) => {
    res.render("about",{
        page_name: "about"
    });
});

const PORT=3000;
app.listen(PORT, () => {
    console.log(`${PORT} Numarali portta sunucu calisiyor.`)
});