// Module import 
import { Tooltip } from "./components/Tooltip.js"
import { addEventOnElements,
    getGreetingMsg,
    makeElemEditable,
    activateNotebook } from "./utils.js"
import { client } from "./client.js"

import { db } from "./db.js"
import { NoteModal } from "./components/Modal.js"
// toggle sidebar in small screen 

const  $sidebar = document.querySelector(".sidebar")
const  $sidebarTogglers = document.querySelectorAll(".data-sidebar-toggler")
const $overlay = document.querySelector(".data-sidebar-overlay")




addEventOnElements($sidebarTogglers,"click",()=>{
    $sidebar.classList.toggle("active");
    $overlay.classList.toggle("active");
})

// show greeting message on HomePage

const greetElem = document.querySelector(".data-greeting");

const currentHour = new Date().getHours();

 greetElem.textContent = getGreetingMsg(currentHour);

//  Show current date and time to home page

const currentDateElem=document.querySelector(".data-current-date");

currentDateElem.textContent = new Date().toDateString().replace(" ",", ")

// initialize tooltip behaviour for all dom element with a [data-tooltip] attribute

const tooltipElem = document.querySelectorAll(".data-tooltip")
tooltipElem.forEach(elem=>Tooltip(elem))


// Notebook create field

const sideBarList = document.querySelector("[data-sidebar-list]");

const addNotebookBtn = document.querySelector("[data-add-notebook]")

const showNotebookField = ()=>{
const navItem = document.createElement("div");
navItem.classList.add("nav-item")
navItem.innerHTML = `
<span class="text text-lable-large" data-notebook-field></span>

<div class="state-layer"></div>
`;
sideBarList.appendChild(navItem)
const navItemField = navItem.querySelector("[data-notebook-field]")

// set active to new clicked item and remove from other
 activateNotebook.call(navItem)

//  make notebook field content editable and focus
makeElemEditable(navItemField)
// navItemField.addEventListener("keydown",createNotebook)
navItemField.addEventListener("keydown",createNotebook())
}

const createNotebook = (event)=>{
    if(event.key === "Enter"){
    const notebookData = db.post.notebook(this.textContent || "Untitled")
    this.parentElement.remove()

    // render navitem
    client.notebook.create(notebookData);

    }
}

// render the existing notebook list by retrieving data from the database and passing it to the client 
const renderExistedNotebook = () => {
    const notebookList = db.get.notebook()
    client.notebook.read(notebookList);
} 
renderExistedNotebook()
addNotebookBtn.addEventListener("click",showNotebookField())
// addNotebookBtn.addEventListener("click",showNotebookField)


/**
 * create new note
 * Attaches event listeners to a collection of DOM elements representing " Create Note" button
 * when a button is clicked, it opens a modal for creating a new note and handle the submission 
 * of the new note to the data base and client 
 * **/ 
const $noteCreateBtns = document.querySelectorAll("[data-note-create-btn]");

addEventOnElements($noteCreateBtns,"click",()=>{
    // Create And open a new modal 
    const modal  = NoteModal()
    modal.open()

    // handle submission of the new note to the database and client
    modal.onSubmit(noteObj=>{
  const activeNotebookId = document.querySelector("[data-notebook].active").dataset.notebook;

  const noteData = db.post.note(activeNotebookId,noteObj)
  client.note.create(noteData)
  modal.close()
    })
})



// render existing notes in the active notebook. Retrevies note data from the database based on the active notebook's ID,
// and uses the client to display the notes.

const renderExistedNote = ()=>{
    const activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook;
    if(activeNotebookId){
        const noteList = db.get.note(activeNotebookId)
        // Display existing note 
        client.note.read(noteList)
    }
}
renderExistedNote()