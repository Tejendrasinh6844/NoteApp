
const $overlay = document.createElement("div")
$overlay.classList.add("overlay","modal-overlay")

/* create and manages a modal for adding or editing notes. 
the modal allows users to input a note's title and text, 
and provide functionality to submit and save the note 
*/ 
const NoteModal = function(title = "Untitled",text = "Add your note...", time = "") {
   const $modal = document.createElement("div")
   $modal.classList.add("modal")
   $modal.innerHTML = `
   
<button class="icon-btn large" aria-label="Close model" data-close-btn>

    <span class="material-symbols-rounded" aria-hidden="true">close</span>
    <div class="state-layer"></div>
</button>
<input type="text" class="modal-title text-title-medium" placeholder="Untitled" value="${title}" data-note-field>

<textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar" data-note-field>${text}</textarea>

<div class="modal-footer">
<span class="time text-label-large">${time}</span>
<button class="btn text" data-submit-btn>
<span class="text-label-large">Save</span>
<div class="state-layer"></div>
</button>

</div>

  </div>

<div class="overlay modal-overlay" date-modal-overlay></div>
<div class="modal">
   <h3 class="modal-title text-title-medium">Are you sure you want to delete <strong>"Note Title"</strong>?</h3>
    
    <div class="modal-footer">
    <button class="btn text" >
    <span class="text-label-large">Cancel</span>
    <div class="state-layer"></div>
    </button>
    <button class="btn fill" >
    <span class="text-label-large">Delete</span>
    <div class="state-layer"></div>
    </button>
    
    </div>
   `

   const $submitBtn = $modal.querySelector("[data-submit-btn]")
const [$titleField, $textField] = $modal.querySelectorAll("[data-note-field]")
$submitBtn.disabled = true;

const enableSubmit = function(){
    $submitBtn.disabled = !$titleField.value && !$textField.value;
}

$textField.addEventListener("keyup",enableSubmit)
$titleField.addEventListener("keyup",enableSubmit)


//    opens the node modal by appending it to the document body and setting focus on the title field.
  const open =function (){
    document.body.appendChild($modal)
    document.body.appendChild($overlay)
    $titleField.focus()
}

//   closes the note modal by removing it from the document body

const close =function (){
    document.body.removeChild($modal)
    document.body.removeChild($overlay)

       }

    //    Attach click event to closebtn, when click call the close modal function
    const $closeBtn = $modal.querySelector("[data-close-btn]")

    $closeBtn.addEventListener("click",close)

    // handle the submisstion of a note within the modal
    const onSubmit = function(callback){
     $submitBtn.addEventListener("click",()=>{
        const noteData = {
            title:$titleField.value,
            text:$textField.value
        }
       callback(noteData) 
     })
    }


  return {open,close,onSubmit }
}




// create modal and confirming the deletion of an item

const DeleteConfirmModal =function (title){

    const $modal = document.createElement("div");
     $modal.classList.add("modal")
     $modal.innerHTML = `
      <h3 class="modal-title text-title-medium">Are you sure you want to delete <strong>"${title}"</strong>?</h3>
    
    <div class="modal-footer">
    <button class="btn text" data-action-btn="false" >
    <span class="text-label-large">Cancel</span>
    <div class="state-layer"></div>
    </button>
    <button class="btn fill" data-action-btn="true">
    <span class="text-label-large" >Delete</span>
    <div class="state-layer"></div>
    </button>
    
    </div>
    `
  
    // opens the delete confirmation modal by appending it to the document body
    const open =function (){
        document.body.appendChild($modal)
        document.body.appendChild($overlay)
      
    }

const actionBtns = $modal.querySelectorAll("[data-action-btn]")

// close the deletecomfirmation modal by removing it from the document body

const close =function (){
         document.body.removeChild($modal)
         document.body.removeChild($overlay)
}

// Handles the submission of the delete confirmation 

const onSubmit=function(callback){
    actionBtns.forEach(($btn)=> $btn.addEventListener("click",()=>{
        const isConfirm = this.dataset.actionBtns === "true" ? true : false;
        callback(isConfirm)
    })

    )
}


     return { open, close, onSubmit }
}


export {DeleteConfirmModal, NoteModal}