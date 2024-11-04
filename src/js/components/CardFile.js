
import { client } from "../client";
import { db } from "../db";
import { getRelativeTime } from "../utils";
import { DeleteConfirmModal, NoteModal } from "./Modal";
import { Tooltip } from "./Tooltip";

// create an HTML card representing a note based on provided note data.
export const Card =function (noteData){
     const {id, title, text, postedOn, notebookId} = noteData;

     const $card = document.createElement("div")

     $card.classList.add("card");
     $card.setAttribute("data-note", id);
     $card.innerHTML = `
     
    <h3 class="card-title text-title-medium">${title}</h3>
    <p class="card-text text-body-large">${text}</p>
    <div class="wrapper">
        <span class="card-time text-label-large">${getRelativeTime(postedOn)}</span>
        <button class="icon-btn large" aria-label="Delete note" data-tooltip="Delete note" data-delete-btn>
            
<span class="material-symbols-rounded" aria-hidden="true">delete</span>
<div class="state layer"></div>
        </button>
    </div>
    <div class="state-layer"></div>

     `

     Tooltip($card.querySelector("[data-tooltip]"))

    $card.addEventListener("click",function(){
        const modal = NoteModal(title, text, getRelativeTime(postedOn))
        modal.open()
        modal.onSubmit((noteData)=>{
         const updatedData = db.update.note(id, noteData)
        //  update the note in the client UI
        client.note.update(id, updatedData)

        modal.close()
        })
    })

    // Note delete functionality
    // Attaches a click event listeners to delete button element within card.
    // when the delete button is clicked, it open a confirmation modal for deleting the associated note.
    // If the deletion is confirmed, it updates the UI and database to remove the note.
    const deleteBtn = $card.querySelector("[data-delete-btn]");

    deleteBtn.addEventListener("click", function(e){
        e.stopImmediatePropagation()
        const modal = DeleteConfirmModal(title);

        modal.open()

        modal.onSubmit((isComfirm)=>{
         if(isComfirm){
            const existedNotes = db.delete.note(notebookId, id)
            // Update the client UI to reflect note deletion 
            client.note.delete(id, existedNotes.length) 
         }
         modal.close()
        })
    })


     return $card;
}

