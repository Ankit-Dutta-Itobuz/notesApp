const form = document.querySelector('#form');
const title = document.querySelector('#title');
const text = document.querySelector('#task');
const submit = document.querySelector('#submit');
const msgErr = document.querySelector('#msgErr');
const taskContainer = document.querySelector('#taskContainer')
// const taskBox = document.querySelector('#taskBox');

form.addEventListener('submit', onSubmit);
function onSubmit(e){
    e.preventDefault();
    if (title.value.trim() === '' || text.value.trim() === '' )
    {
        msgErr.innerHTML = 'Please enter all fields';
        setTimeout(()=>msgErr.remove(), 3000);
    }
    else{
        taskContainer.innerHTML += 
    `<div class="card col-lg-3 col-md-4 col-sm-6 my-3">
    <div class="card-body">
      <h5 class="card-title" id="noteTitle">${title.value}</h5>
      <p class="card-text" id="noteText">${text.value}</p>
      <div class="buttonBox row justify-content-around">
        <a href="#" id="edit" class="btn btn-primary col-3">Edit</a>
        <a href="#" id="delete" class="btn btn-primary col-3">Delete</a>
    </div>
    </div>
  </div>`
        title.value = '';
        task.value = '';
    }
}