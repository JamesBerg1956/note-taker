// import express
var express = require("express");
// create instance of express
var app = express();
// create var PORT for express to listen to
var PORT = 3000;

// convert queryString request from client to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import path package
var path = require("path");
var dbJson = path.join(__dirname, "db/db.json");

// import fs
var fs = require("fs");

// Basic route that sends the user first to the AJAX Page
app.get("/public", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/public/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

// TODO: create /notes express route
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// TODO: create algo for /api/notes GET express route
app.get("/api/notes", function(req, res) {
    console.log(dbJson);
    var jsn = JSON.parse(fs.readFileSync(dbJson, "utf8"));
    console.log(jsn);
    return res.json(jsn);
});

// TODO: create algo for /api/notes POST express route

// TODO: create algo for /api/notes DELETE express route

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});