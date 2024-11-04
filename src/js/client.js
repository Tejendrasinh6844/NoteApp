// The client object manages interaction with the UI to create, read, update and delete notebooks and notes. 
// it provides function for performing these oprations and updating the UI accordingly.

import { Card } from "./components/CardFile";
import { NavItem } from "./components/NavItem";
import { activateNotebook } from "./utils";


const notePanelTitle = document.querySelector("[data-note-panel-title]")
const sideBarList = document.querySelector("[data-sidebar-list]")
const $notePanel = document.querySelector("[data-note-panel]")
const $noteCreateBtns = document.querySelectorAll("[data-note-create-btn]");



const emptyNotesTemplate = `
  <div class="empty-notes">
        <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>
        <div class="text-headline-small">No notes</div>
      </div>
`
// enables or disables "Create Note" based on whether there are any notebooks.
const disableNoteCreateBtns = (isThereAnyNotebooks)=>{
 $noteCreateBtns.forEach($item => {
  $item[isThereAnyNotebooks ? "removeAttribute" : "setAttribute"]("disabled", "")
 })
}

export const client ={

  notebook:{
    // create new note book in the UI
    create(notebookData){
     const navItem = NavItem(notebookData.id,notebookData.name)
     sideBarList.appendChild(navItem)
     activateNotebook.call(navItem)
     notePanelTitle.textContent = notebookData.name;
     $notePanel.innerHTML = emptyNotesTemplate
     disableNoteCreateBtns(true)
    },
    // read and display a list of notebooks in the UI
    read(notebookList){
      disableNoteCreateBtns(notebookList.length)
        notebookList.forEach((notebookData,index) => {
            const navItem = NavItem(notebookData.id,notebookData.name)

            if(index === 0){
             activateNotebook.call(navItem)
             notePanelTitle.textContent = notebookData.name;
            }

            sideBarList.appendChild(navItem)
        });
    },

    // update the UI to reflect changes in notebook
    update(notebookID,notebookData){
      const oldNotebook = document.querySelector(`[data-notebook="${notebookID}"]`)
      const newNotebook = NavItem(notebookData.id,notebookData.name)

      notePanelTitle.textContent = notebookData.name;
      sideBarList.replaceChild(newNotebook,oldNotebook)
      activateNotebook.call(newNotebook)
    },

    // delete the note book from UI
    delete(notebookID){
     const deletedNotebook = document.querySelector(`[data-notebook='${notebookID}']`)
     const $activeNavItem = deletedNotebook.nextElementSibling ?? deletedNotebook.previousElementSibling;
       if($activeNavItem){
        $activeNavItem.click()
       }else{
        notePanelTitle.innerHTML = "";
        $notePanel.innerHTML = "";
        disableNoteCreateBtns(false)
       }
     deletedNotebook.remove()
    }
  },
  note:{
    // create a new note card in the UI based on provided note data.
    create(noteData){
      // clear "emptyNotesTemplate" from "notePanel" if there is no note exits 
      if(!$notePanel.querySelector("[data-note]")) $notePanel.innerHTML = "";

    //  append card in notePanel
    const $card = Card(noteData);

    $notePanel.prepend($card)

    },
    // Reads and display a list of notes in the UI
    read(nodeList){

      if(nodeList.length){
      $notePanel.innerHTML = ""

      nodeList.forEach(notesData=>{
        const $card = Card(notesData)
        $notePanel.appendChild($card)
      })
      }else{
        $notePanel.innerHTML = emptyNotesTemplate;
      }

    },

    // Updates a note card in the UI based on provided note data.
    update(noteId, noteData){
     const $oldCard = document.querySelector(`[data-note='${noteId}']`)
     const $newCard = Card(noteData);
     $notePanel.replaceChild($newCard, $oldCard)
    },

    // Delete the note card from the UI 
    delete(noteId, isNoteExists){
      document.querySelector(`[data-note="${noteId}"]`).remove()
      if(!isNoteExists) $notePanel.innerHTML = emptyNotesTemplate;
    }

  }
}