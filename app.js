const path = require("path");
const express = require("express");
const routes = require("./routes/routes");
const db = require("./data/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(routes);

app.use((req, res) => {
    res.status(404).render("404");
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render("500");
});

db.connectDb().then(() => {
    app.listen(3000);
    console.log("http://localhost:3000/");
});
