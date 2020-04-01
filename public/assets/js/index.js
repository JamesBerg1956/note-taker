// declare var for all note-title active text boxes - calls handleRenderSaveBtn() on keyup
var $noteTitle = $(".note-title");
// declare var for note-textarea active text areas - calls handleRenderSaveBtn() on keyup
var $noteText = $(".note-textarea");
// declare var for save-note icon - calls handleNoteSave on click
var $saveNoteBtn = $(".save-note");
// declare var for new-note icon - calls handleNewNoteView() on click
var $newNoteBtn = $(".new-note");
// declare var of save note cards - .list group opens the note for editing and .delete note will be an icon that deletes the note
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// TODO: import express, create instance, var PORT

// TODO: create middleware code

// TODO: import path package, var `${___dir}db/db.json`

// TODO: create / express route
// TODO: create algo for / express route

// TODO: create /notes express route
// TODO: create algo for /notes express route

// A function for getting all notes from the db
// TODO: convert /api/notes GET route to express
// TODO: create algo for /api/notes GET express route
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
// TODO: convert /api/notes POST route to express
// TODO: create algo for /api/notes POST express route
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
// TODO: convert /api/notes DELETE route to express
// TODO: create algo for /api/notes DELETE express route
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// START renderActiveNote If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  
  // hide the .save-note icon
  $saveNoteBtn.hide();

  // START if the current note object exists and has an id property then
  if (activeNote.id) {

    // set .note-title input to readonly
    $noteTitle.attr("readonly", true);
    // set .note-textarea textarea to readonly
    $noteText.attr("readonly", true);
    // set value of .note-title input to activeNote.title
    $noteTitle.val(activeNote.title);
    // set value of .note-textarea textarea to activeNote.text
    $noteText.val(activeNote.text);

    // START else - enable to .note-title and .note-text fields and set their values to blank
  } else {

    // enable .note-title input
    $noteTitle.attr("readonly", false);
    // enable .note-text input
    $noteText.attr("readonly", false);
    // set value of note-title to blank
    $noteTitle.val("");
    // set value of note-text to blank
    $noteText.val("");

  }
    // END else

};
// END renderActiveNote

// START handleNoteSave - Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  
  // create new note object
  var newNote = {
    // title prop: value of .note-title
    title: $noteTitle.val(),
    // title prop: value of .note-text
    text: $noteText.val()
  };

  // call /api/notes POST express route, which also assigns newNote to activeNote
  saveNote(newNote).then(function(data) {
    // call getAndRenderNotes() - create li, span, i elements in DOM
    getAndRenderNotes();
    // call renderActiveNote() - populate values of .note-title and .note-text with activeNote
    renderActiveNote();
  });

};
// END handleNoteSave

// START handleNoteDelete - Delete the clicked note
var handleNoteDelete = function(event) {

  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  // get id value of data attribute in parent list item of the current <i> element
  var note = $(this)
    .parent(".list-group-item")
    .data();

  // if the id property of the activeNote object equals the value of the data attribute of the <i> element's parent <li> element
  if (activeNote.id === note.id) {
    // delete the current activeNote object
    activeNote = {};
  }

  // call /api/notes DELETE express route
  deleteNote(note.id).then(function() {
    // call getAndRenderNotes() - create li, span, i elements in DOM
    getAndRenderNotes();
    // call renderActiveNote() - populate values of .note-title and .note-text with activeNote
    renderActiveNote();
  });

};
// END handleNoteDelete

// START handleNoteView - Sets the activeNote and displays it when user clicks a note card <li> element
var handleNoteView = function() {

  // set activeNote object to note object stored in data attribute of current <li> element
  activeNote = $(this).data();

  // call renderActiveNote() - populate values of .note-title and .note-text with activeNote 
  renderActiveNote();

};
// END handleNoteView

// START handleNewNoteView Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {

  // set activeNote object to nothing
  activeNote = {};

  // call renderActiveNote() - enable and blank values of .note-title and .note-text 
  renderActiveNote();

};
// END handleNewNoteView

// Or else show it
// START handleRenderSaveBtn
var handleRenderSaveBtn = function() {

  // If a note's title or text are empty hide the save button
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  // else show the save button
  } else {
    $saveNoteBtn.show();
  }

};
// END handleRenderSaveBtn

// START renderNoteList - Render's the list of note titles
var renderNoteList = function(notes) {
  
  // remove all elements from the .list-group <ul> element
  $noteList.empty();
  // create blank array to store <li> elements
  var noteListItems = [];

  // START loop through notes array - from function parameter
  for (var i = 0; i < notes.length; i++) {

    // create note object from current index of notes array
    var note = notes[i];

    // create a <li> element and stores the note object in the data attribute of the <li> element
    var $li = $("<li class='list-group-item'>").data(note);

    // create a <span> element and add the note.title property to the text
    var $span = $("<span>").text(note.title);

    // create a <i> element and assign it the following classes, delete-note will trigger the handleNoteDelete() function
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    // append the <span> and <i> elements to the <li> element
    $li.append($span, $delBtn);

    // push the <li> element to the noteListItems array
    noteListItems.push($li);

  }
  // END loop through notes array

  // append the array of <li> elements to the .list-group-item <ul> element
  $noteList.append(noteListItems);

};
// END renderNoteList

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {

  // pass the db.json to the renderNoteList() function via the /api/notes GET express route and render the list of notes and titles
  return getNotes().then(function(data) {
    renderNoteList(data);
  });

};

// event listener for .save-note <i> element
$saveNoteBtn.on("click", handleNoteSave);
// event listener for .list-group-item <li> elements
$noteList.on("click", ".list-group-item", handleNoteView);
// event listener for .new-note <i> element
$newNoteBtn.on("click", handleNewNoteView);
// event listener for .delete-note <i> elements
$noteList.on("click", ".delete-note", handleNoteDelete);
// event listener for .note-title <input> element
$noteTitle.on("keyup", handleRenderSaveBtn);
// event listener for .note-text <textarea> element
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
