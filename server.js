// import express
const express = require("express");
// create instance of express
const app = express();
// create var PORT for express to listen to
const PORT = process.env.PORT || 3000;

// convert queryString request from client to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import path package
const path = require("path");
const dbJson = path.join(__dirname, "db/db.json");

// import fs
const fs = require("fs");

// route that finds index.js
app.get("/public/assets/js/index.js", function(req, res) {
    // send index.js file as response
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

// route that finds css stylesheet
app.get("/public/assets/css/styles.css", function(req, res) {
    // send styles.css file as response
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    // send index.html file as response
    res.sendFile(path.join(__dirname, "index.html"));
});

// /notes express route
app.get("/notes", function(req, res) {
    // semd notes.html file as response
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// /api/notes GET express route
app.get("/api/notes", function(req, res) {
    // create create json object from db/db.json file 
    const jsn = JSON.parse(fs.readFileSync(dbJson, "utf8"));
    // return json object as response
    return res.json(jsn);
});

// create algo for /api/notes POST express route
app.post("/api/notes", function(req, res){

    // create create json object from db/db.json file 
    const jsn = JSON.parse(fs.readFileSync(dbJson, "utf8")); 

    // creat a new var for the new id to be created
    let newId = 0;
    // loop through the note object array
    for (let i = 0; i < jsn.length; i++) {
        // if the id of the current note object is greater than newId
        if(parseInt(jsn[i].id) > parseInt(newId)){
            // then assign the current note object id to newId
            newId = jsn[i].id;
        }
    }
    // increment newId to make the next highest id
    newId++;

    // create new note object from req.body and id created above
    const note = {id: String(newId), title: req.body.title, text: req.body.text};

    // push new note object to jsn
    jsn.push(note);

    // create stringified version of jsn
    const strJsn = JSON.stringify(jsn);
        
    // write arrNotes to db/db.json file
    fs.writeFile(dbJson, strJsn, function(err){
        // if error console error
        if(err){return console.log(err)};
    });

    // respond with note object just added
    res.json(jsn);

});

// create algo for /api/notes DELETE express route
app.delete("/api/notes/:id", function(req, res){

    // create note id of note to delete
    var idToDelete = req.params.id.replace(":","");
    
    // get json of db/db.json
    let jsn = JSON.parse(fs.readFileSync(dbJson, "utf8")); 

    // loop through json and remove note that requested note id to delete
    for (let i = 0; i < jsn.length; i++) {
        // if id property of current note object equals id to be deleted
        if(jsn[i].id == idToDelete){
            // then remove that note object from the array
            jsn.splice(i, 1);
        }
    }

    // create stringified version of jsn
    const strJsn = JSON.stringify(jsn);

    // write json back to db/db.json
    fs.writeFile(dbJson, strJsn, function(err){
        // if error console error
        if(err){return console.log(err)};
    });

    // respond with note object just deleted
    res.json(jsn);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});