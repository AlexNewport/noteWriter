var detachedWriter;

var detachedNote;

function insertNote() {
    insertAt = parseInt($("#noteWriter").attr('name').slice(-1));
    noteText = $("#noteWriterArea").val();
    let newNote = $(`
    <div class="note" id="slot${insertAt}">
        <p id="noteNum">Note Slot #${insertAt}</p>
        <br>
        <textarea readonly class="noteContent">${noteText}</textarea>
    </div>
    `);

    existingNotes = $("#notesBox div");
    if (existingNotes.length <= 10) {
        addOneToNotesAfter(insertAt);
        $("#noteWriter").before(newNote).hide().fadeIn(500);
        $("#noteWriter").attr('name', `slot${insertAt + 1}`);
        $("#noteWriterArea").val('');
        if (existingNotes.length == 10) {
            detachedWriter = $("#noteWriter").detach();
        }
    }
}

function deleteNote() {
    existingNotesCount = $(".note").length;
    noteNumToDelete = parseInt($("#noteToDelete").val());
    $(`#slot${noteNumToDelete}`).remove();
    if (existingNotesCount == 9) {
        $("#notesBox").append(detachedWriter);
    }
    subtractOneFromNotesAfter(noteNumToDelete);
}

function detachNote() {
    noteNumToDetach = parseInt($("#noteToDetach").val());
    $(`#slot${noteNumToDetach}`).attr('id', "detachedNote");
    detachedNote = $(`#detachedNote`).detach();
    subtractOneFromNotesAfter(noteNumToDetach);
}

function reattachNote() {
    if (detachedNote != null) {
        reattachAt = parseInt($("#reattachAt").val());
        console.log($("#notesBox div").length - 1);
        if ($("#notesBox div").length - 2 != 0) {
            addOneToNotesAfter(reattachAt);
            if (reattachAt == 1) {
                $(`#slot${reattachAt + 1}`).before(detachedNote);
            }
            else {
                $(`#slot${reattachAt - 1}`).after(detachedNote);
            }
        }
        else {
            $("#notesBox").append(detachedNote);
            moveRight();
        }
        $(`#detachedNote p:first`).html(`Note Slot #${reattachAt}`);
        $(`#detachedNote`).attr('id', `slot${reattachAt}`);
        detachedNote = null;
    }
}

function flipWriter() {
    console.log("TEST");
    $("#noteWriter").addClass("flipNote");
    console.log($("#noteWriter"));
}

function unflipWriter() {
    $("#noteWriter").removeClass("flipNote");
}

function moveLeft() {
    writerSlot = parseInt($("#noteWriter").attr('name').slice(-1));
    prevNote = $(`#slot${writerSlot - 1}`);
    if(prevNote.length) {
        detachedWriter = $("#noteWriter").detach();
        prevNote.before(detachedWriter);
        $("#noteWriter").attr('name', `slot${writerSlot - 1}`);
    }
}

function moveRight() {
    writerSlot = parseInt($("#noteWriter").attr('name').slice(-1));
    nextNote = $(`#slot${writerSlot}`);
    if(nextNote.length) {
        detachedWriter = $("#noteWriter").detach();
        nextNote.after(detachedWriter);
        $("#noteWriter").attr('name', `slot${writerSlot + 1}`);
    }
}

function addOneToNotesAfter(insertNum) {
    existingNotesCount = $("#notesBox div").length - 1;
    for(var count = existingNotesCount; count >= insertNum; count--) {
        $(`#slot${count} p:first`).html(`Note Slot #${count + 1}`);
        $(`#slot${count}`).attr('id', `slot${count + 1}`);

        writerSlot = parseInt($("#noteWriter").attr('name').slice(-1));
        if (writerSlot == count) {
            $("#noteWriter").attr('name', `slot${writerSlot + 1}`);
        }
    }
}

function subtractOneFromNotesAfter(deleteNum) {
    existingNotesCount = $("#notesBox div").length - 1;
    var changeWriterSlot = false;
    writerSlot = parseInt($("#noteWriter").attr('name').slice(-1));

    for(var count = existingNotesCount; count > deleteNum; count--) {
        $(`#slot${count} p:first`).html(`Note Slot #${count - 1}`);
        $(`#slot${count}`).attr('id', `slot${count - 1}`);
        
        if (writerSlot == count + 1) {
            changeWriterSlot = true;
        }
    }

    if (changeWriterSlot || writerSlot - 1 == deleteNum) {
        $("#noteWriter").attr('name', `slot${writerSlot - 1}`);
    }
}