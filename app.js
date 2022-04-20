// Requires 
const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const db = require("./data/database");
const app = express();

require("dotenv").config()
// Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// converts request body to JSON
app.use(express.urlencoded({ extended: true }));
// Use the express static static method to use the public folder
app.use(express.static("public"));

// Applies routes to the application.
app.use(routes);

// Handles Error 404
app.use((req, res) => {
    res.status(404).render("404");
});

// Handles Error 500
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render("500");
});

// Opens a 3000 connection to the localhost server
db.connectDb().then(() => {
    app.listen(3000);
    console.log("http://localhost:3000/");
});
