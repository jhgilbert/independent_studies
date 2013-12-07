// Read a given param value
function getUrlVar(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && decodeURI(result[1]) || "";
}

var editor = ace.edit("editor");
editor.getSession().setUseWrapMode(true);
var textHasChanged = false;

var noteID = getUrlVar('note_id');

// populate if user is editing an existing note
if (noteID) {
    $.ajax({
        url: "/notes/" + noteID,
        type: "GET"
    }).done(function(data) {
            editor.setValue(data.text);
        });
}

function saveNote(userIsExiting) {
    // Don't bother to save if the user didn't do anything
    if (!textHasChanged === "" && userIsExiting) {
        location.href = "/#/dashboard";
    }
    else {
        // Assemble data for save HTTP requests
        var noteData = {
            note: {
                enrollment_id: parseInt(getUrlVar('enrollment_id')),
                text: editor.getValue()
            }
        };

        // Create or save existing
        var endpoint = (noteID) ? ("/notes/" + noteID) : "/notes";
        var method = (noteID) ? "PUT" : "POST";

        $.ajax({
            url: endpoint,
            type: method,
            data: noteData
        }).done(function(data) {
                if (!noteID) {
                    noteID = data.id;
                }
                if (userIsExiting) {
                    console.log("User is exiting!");
                    location.href = "/#/dashboard";
                }
                okToSave = true;
            });
    }
}

$(document).ready(function() {
    $('#saveAndExit').click(function() {
        saveNote(true);
    });
});

var okToSave = true;

// Save every 20 seconds if user is actively editing the text
editor.on("change", function(){
    textHasChanged = true;
    if (okToSave) {
        okToSave = false;
        setTimeout(function (){
            saveNote(false);
        }, 20000);
    }
    else {
        return true;
    }
});
