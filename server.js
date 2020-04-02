// import express
var express = require("express");
// create instance of express
var app = express();
// create var PORT for express to listen to
var PORT = 3000;

// convert queryString request from client to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import path package, var `${___dir}db/db.json`
var path = require("path");


// TODO: create / express route
// TODO: create algo for / express route

// TODO: create /notes express route
// TODO: create algo for /notes express route

// TODO: create algo for /api/notes GET express route

// TODO: create algo for /api/notes POST express route

// TODO: create algo for /api/notes DELETE express route

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});