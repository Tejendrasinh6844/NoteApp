const addEventOnElements = function ($elements,eventType,callback){
    
    
 $elements.forEach($element =>  $element.addEventListener(eventType,callback)
 );
}

// Generate greeting message based on current hours of the day! 

const getGreetingMsg = (currentHour)=>{
    const greeting = currentHour < 5 ? "Night" :
      currentHour < 12 ? "Morning" :
      currentHour < 15 ? "Noon" :
      currentHour < 17 ? "Afternoon" :
      currentHour < 20 ? "Evening" : 
      "Night"
 return `Good ${greeting}`;
}
alert(getGreetingMsg(new Date().getHours()), "From Utils.js remove it");

let lastActiveNavItem;

// Activetes navigation by adding active class and deactivate previously active class

const activateNotebook =()=>{
    lastActiveNavItem?.classList.remove("active")
    this.classList.add("active")
    lastActiveNavItem = this
}
const makeElemEditable =(element)=>{
 element.setAttribute("contenteditable",true);
 element.focus()
}

// generate new id based on time stamp
const generateID = ()=>{
    return new Date().getTime().toString();
}

// find note book by id in database
const findNotebook = (db, notebookID)=>{
return db.notebooks.find(notebook => notebook.id === notebookID)
}

// finds the index of a notebook in an array of notebooks based on its id
const findNotebookIndex = (db, notebookID) => {
return db.notebooks.findIndex(item => item.id === notebookID)
}

// convert a time stamp in milliseconds to a human-readable relative time string 
const getRelativeTime = (milliseconds)=>{
    const currentTime = new Date().getTime();

    const  minute = Math.floor((currentTime - milliseconds)/ 1000 / 60)
    const hour = Math.floor(minute / 60)

    const day = Math.floor(hour / 24)

    return minute < 1 ? "Just now" : minute < 60 ? `${minute} min ago` : hour < 24 ? `${hour} hour ago` : `${day} day ago`
}

// find a specific note by its ID within a database of notebooks and their notes.
   const findNote = (db, noteId)=>{
    let note;
    for(const notebook of db.notebooks){
        note = notebook.notes.find(note=> note.id === noteId)
        if(note) break; 
    }
    return note;
   }

//    Finds the index of a note in a notebook's array of notes based on it's ID 
const findNoteIndex = (notebook, noteId)=>{
    return notebook.notes.findIndex(note => note.id === noteId)

}
export {
    addEventOnElements,
    getGreetingMsg,
    activateNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime,
    findNote,
    findNoteIndex
}
