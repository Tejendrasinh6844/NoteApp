// create a navigation item representing a notebook. this item display the notebook's name, allow editing and deletion of the note book and handles click event to display its associated notes.

import { client } from "../client"
import { db } from "../db"
import { activateNotebook, makeElemEditable } from "../utils"
import { Tooltip } from "./Tooltip"
import { DeleteConfirmModal } from "./Modal"
const notePanelTitle = document.querySelector("[data-note-panel-title]")
export const NavItem =(id,name)=>{


    const navItem = document.createElement("div")

    navItem.classList.add("nav-item")
    navItem.setAttribute("data-notebook",id)
    navItem.innerHTML = ` 
        <span class="text-label-large text" data-notebook-field>${name}</span>
        <button class="icon-btn small" aria-label="Edite Notebook" data-tooltip="Edite Notebook" data-edit-btn>
            <span class="material-symbols-rounded" aria-hidden="true">edit</span>
            <div class="state-layer"></div>
        </button>

        <button class="icon-btn small" aria-label="Delete Notebook" data-tooltip="Delete Notebook" data-delete-btn>
            <span class="material-symbols-rounded" aria-hidden="true">delete</span>
            <div class="state-layer"></div>
        </button>
        <div class="state-layer"></div>`

    // show tooltip on edit and delete button 
    const tooltipElems = document.querySelectorAll("[data-tooltip]")
    tooltipElems.forEach(elem => Tooltip(elem))

    //  Handle click event on navigation item, update the note panel title, retrieves  the associated notes and marks the item as active  
    
    navItem.addEventListener("click",()=>{
        notePanelTitle.textContent = name;
        activateNotebook.call(this)
        const noteList = db.get.note(this.dataset.notebook)
        client.note.read(noteList)
    })

    // notebook edit functionality

    const navItemEditBtn = navItem.querySelector("[data-edit-btn]")
    const navItemField = navItem.querySelector("[data-notebook-field]")

    navItemEditBtn.addEventListener("click",makeElemEditable.bind(null,navItemField))

    navItemField.addEventListener("keydown",(event)=>{

       if( event.key === "Enter"){
         this.removeAttribute("contenteditable")

        //   Update edited data in database
        const updatedNotebookData = db.update.notebook(id, this.textContent)
        
        // render updated notebook
        client.notebook.update(id,updatedNotebookData)


       }
    })

//    notebook delete functionality
    const navItemDeleteBtn = navItem.querySelector("[data-delete-btn]");
        navItemDeleteBtn.addEventListener("click",()=>{
            const modal = DeleteConfirmModal(name)

            modal.open()

            modal.onSubmit((isConfirm)=>{
                if (isConfirm){
                    db.delete.notebook(id)
                    client.notebook.delete(id)
                }

                modal.close()
            })
        })
    return navItem
}

