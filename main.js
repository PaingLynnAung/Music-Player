let card = document.querySelector(".card");
let cross = document.querySelector(".fa-xmark");
let addNoteBtn = document.querySelector(".add-note-btn");
let typingBox = document.querySelector(".typing-box");
let input = document.querySelector("#input");
let textarea = document.querySelector("#textarea");
let wapper = document.querySelector(".wapper");
let noteCart = Array.from(document.querySelectorAll('.note-section'));


let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Octo",
  "Nov",
  "Dec",
];

// Add New Note Cart
card.addEventListener("click", () => {
  typingBox.style.visibility = "visible";
});

// Remove Form
cross.addEventListener("click", () => {
  document.querySelector('.alert').style.display = 'none'
  typingBox.style.visibility = "hidden";
  input.value = '';
  textarea.value = '';
  addNoteBtn.removeAttribute('id')
});



//Addnote Form Button Click
addNoteBtn.addEventListener("click", (e) => {
  let date = new Date();
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  let hour = date.getHours();
  let min = date.getMinutes();

  let titleText = input.value;
  let descriptionText = textarea.value;

  if (titleText && descriptionText) {
    if (e.target.id) {
      let getitems = JSON.parse(localStorage.getItem('notes'))
      let updateNote = getitems.map((data, index) => {
        if (index === parseInt(e.target.id)) {
          data.title = input.value;
          data.description = textarea.value;
          data.date = `${month} ${day} ${year}`,
            data.time = `(${hour}:${min})`
          return data
        } else {
          return data
        }

      })
      input.value = '';
      textarea.value = '';
      typingBox.style.visibility = 'hidden';
      addNoteBtn.removeAttribute('id')
      localStorage.setItem('notes', JSON.stringify(updateNote))
    } else {
      let noteInfo = {
        title: titleText,
        description: descriptionText,
        date: `${month} ${day}, ${year}`,
        time: `(${hour}:${min})`
      };

      let existNotesLocalStorage = localStorage.getItem('notes')
      if (existNotesLocalStorage) {
        let getNotes = JSON.parse(localStorage.getItem('notes'))
        getNotes = [...getNotes, noteInfo]
        localStorage.setItem('notes', JSON.stringify(getNotes))
      } else {
        localStorage.setItem('notes', JSON.stringify([noteInfo]))
      }
      input.value = '';
      textarea.value = '';
      typingBox.style.visibility = 'hidden';
      
    }
    insertNoteToWapperElement();
    
  }else{
    document.querySelector('.alert').style.display = 'block'
  }

})

 

//get localstorage and element rerender Function
let insertNoteToWapperElement = async () => {

  let getNoteFromRenderingHTML = Array.from(document.querySelectorAll('#note-section'))
  getNoteFromRenderingHTML.map(d => d.remove())

  let getNoteFromLocalstorage = await JSON.parse(localStorage.getItem('notes'));

  getNoteFromLocalstorage && getNoteFromLocalstorage.map((data, index) => {

    let Cart = document.createElement('div')
    Cart.setAttribute('id', 'note-section')
    Cart.innerHTML = `  <div class='note-header-container'>
                          <h3>${data.title}</h3>
                            <div class='more' id=${index}><div id=${index}></div><div id=${index}></div><div id=${index}></div></div>
                        </div>
                        <div class='date-container'>${data.date} ${data.time}</div>
                        <p>${data.description}</p>
                        <div class='dropdown-container drop' id=${index}>
                            <button class='edit' id=${index}>Edit</button>
                            <button class='remove' id=${index}>remove</button>
                        </div>
                        
     `
    wapper.appendChild(Cart)
  }
  )

  let moreBtn = Array.from(document.querySelectorAll('.more'));
  let edit = Array.from(document.querySelectorAll('.edit'));
  let remove = Array.from(document.querySelectorAll('.remove'));

  moreBtn.map(btn => btn.addEventListener('click', moreBtnFn))
  edit.map(btn => btn.addEventListener('click', editBtnFn))
  remove.map(btn => btn.addEventListener('click', removeBtnFn))

  edit.map(btn => btn.style.background = '#A084DC')
  remove.map(btn => btn.style.background = 'coral')

}
insertNoteToWapperElement() //get localstorage and element rerender




function moreBtnFn(e) {
  document.querySelector('.alert').style.display = 'none'
  let dropDown = Array.from(document.querySelectorAll('.dropdown-container'))
  dropDown.map(data => {
    data.style.visibility = 'hidden'
    if (data.id === e.target.id) {
      if (data.classList.contains('drop')) {
        data.style.visibility = 'visible'
      } else {
        data.style.display = 'hidden'
      }
    }
    data.classList.toggle('drop')
  })

}

let getItems;
// Remove Note Function
function removeBtnFn(e) {
  getItems = JSON.parse(localStorage.getItem('notes'));
  let filterNotes = getItems.filter((data, index) => parseInt(e.target.id) !== index)
  localStorage.setItem('notes', JSON.stringify(filterNotes))

  insertNoteToWapperElement() //get localstorage and element rerender
}

// Edit Note Function
function editBtnFn(e) {
  console.log('edit')
  getItems = JSON.parse(localStorage.getItem('notes')); //Get notes from localstorage
  let changeNote = getItems[parseInt(e.target.id)] // Select update note
  input.value = changeNote.title;
  textarea.value = changeNote.description;
  addNoteBtn.setAttribute('id', e.target.id)
  typingBox.style.visibility = 'visible'; // Show typing box
}

