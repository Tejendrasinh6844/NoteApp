import { generateID,findNotebook, findNotebookIndex, findNote, findNoteIndex } from "./utils"


let notekeeperDB = {}

const initDB =()=>{
    const db = localStorage.getItem("notekeeperDB")

    if(db){
        notekeeperDB =JSON.parse(db)
    }else{
        notekeeperDB.notebooks = []
        localStorage.setItem("notekeeperDB",JSON.stringify(notekeeperDB))
    }
}

initDB()
// reads and loads the localstorage data in to the globle variable "NotekeeperDB"
const readDB = ()=>{
    notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"))
}

// write the curent state of the globle variable "notekeeperDB" to localstorage
const writeDB =()=>{
localStorage.setItem("notekeeperDB",JSON.stringify(notekeeperDB))
}

export const db = {

    
    post : {
        notebook(name){
            readDB();
          const notebookData = {
            id:generateID(),
            name,
            notes:[]
          }
            notekeeperDB.notebooks.push(notebookData) 
            writeDB()

            return notebookData;
        },
        // add a new note to a specifield notebook in the database
        note(notebookID,object){
            readDB()

            const notebook = findNotebook(notekeeperDB,notebookID)
            const noteData = {
                id: generateID(),
                notebookID,
                ...object,
                postedOn: new Date().getTime()
            }
            notebook.notes.unshift(noteData)

            writeDB()
            return noteData;
        }
    },
    
    // retrieves all notebook from database 
    get:{
    notebook(){
readDB();
return notekeeperDB.notebooks;
    },
    // Retrieves all notes within a specifield notebook.
    note(notebookID){
        readDB()
        const notebook = findNotebook(notekeeperDB,notebookID)
        return notebook.notes;
    }
    },

    update:{
        // update the name of note book in database
        notebook(notebookID,name){
            readDB()
             const notebook = findNotebook(notekeeperDB,notebookID)
             notebook.name = name;
            writeDB()
    return notebook
        },
        // Update the content of a note in the database.
        note(noteId, object){
          readDB();
          const oldNote = findNote(notekeeperDB,noteId)
          const newNote = Object.assign(oldNote,object)

          writeDB();

          return newNote
        }
    },

    delete:{
        // delete notecook from data base
        notebook(notebookID){
         readDB()
         const notebookIndex = findNotebookIndex(notekeeperDB, notebookID)
           notekeeperDB.notebooks.splice(notebookIndex, 1)
         writeDB()
        },

        // Delete a note from a specified notebook in the data base.
        note(notebookId, noteId){
            readDB()
           const notebook = findNotebook(notekeeperDB, notebookId)
           const noteIndex = findNoteIndex(notebook, noteId)
           notebook.note.splice(noteIndex,1)
           writeDB()

           return notebook.notes;
        
        }
    }


}