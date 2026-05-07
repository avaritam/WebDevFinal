// Get color user picked
var selectedColor = '#fed691'

function setColor(color){
    selectedColor = color
}

function showConfirmation(message) {
    var text = document.getElementById("modal-message");
    text.innerText = message;

    var modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    modal.show();
}

// SAVE MESSAGE IN CREATE PAGE
function saveMessage() {
    // Get what user typed
    var textBox = document.getElementById("message")
    var text = textBox.value

    var color = selectedColor

    // Prevents submit in case nothing was typed
    if (text == ""){
        showConfirmation("Please write something first.")
        return
    }

    // Get existing messages from storage
    var storedData = localStorage.getItem("messages")

    // Empty list if no messages exist
    var messages;

    if (storedData == null) {
        messages = []
    } else {
        messages = JSON.parse(storedData)
    }

    // New message with users text, color, timestamp
    var newMessage = {
        text: text,
        color: color,
        time: new Date().toLocaleString()
    }

    // Add new message to list
    messages.push(newMessage)

    // Save most updated list back to storage
    localStorage.setItem("messages",JSON.stringify(messages))

    // Clear textbox for next use and alert user of submission
    textBox.value = ""
    showConfirmation("Congrats! Your news has been shared <3")
}

let messages = JSON.parse(localStorage.getItem("messages"))


// INDEX PAGE rotate for gallery
document.querySelectorAll(".note-mini").forEach(note => {
    const randomAngle = (Math.random() * 10) - 5; // -5° to +5°
    note.style.transform = `rotate(${randomAngle}deg)`;
})

// LOAD MESSAGE IN ARCHIVE PAGE
function loadMessages() {
    // Get grid and saved messages
    var grid = document.getElementById("grid")
    var storedData = localStorage.getItem("messages")

    var messages;

    if (storedData == null) {
        messages = []
    } else {
        messages = JSON.parse(storedData)
    }

    // Clear grid first
    grid.innerHTML = ""

    // Show newest messages on top
    for (var i = messages.length - 1; i >= 0; i--){
        var msg = messages[i]

        // Create column and message box
        var col = document.createElement("div")
        col.className = "col-md-4 mb-4"
        var box = document.createElement("div")
        box.className = "note"

        // Apply user color and text
        box.style.backgroundColor = msg.color
        box.style.borderRadius = "10px"

        // Add angle/organic look to notes
        var angles = [-2, -1, 0, 1, 2]
        var randomRotate = angles[Math.floor(Math.random() * angles.length)]


        // Fade in gallery effect
        box.style.setProperty("--rot", randomRotate + "deg")

        // Message = user inputed text
        box.innerHTML = msg.text

        // Number each message
        var number = document.createElement("div")
        number.className = "note-number"
        number.innerText = '#' + (i + 1)
        box.appendChild(number)

        // Organize columns and grid
        col.appendChild(box)
        grid.appendChild(col)
    }
}
