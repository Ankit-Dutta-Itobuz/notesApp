const form = document.querySelector('#form');
const title = document.querySelector('#title');
const text = document.querySelector('#task');
const submit = document.querySelector('#submit');
const msgErr = document.querySelector('#msgErr');
const taskContainer = document.querySelector('#taskContainer')
const popUp = document.querySelector('.popUp')

let noteToBeDeleted = null;
// let noteToBeUpdated = null;
// const taskBox = document.querySelector('#taskBox');

function getAllNotes() {
    taskContainer.innerHTML = '';
    fetch("http://localhost:8080/getNotes")
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.data.length; i++) {
                taskContainer.innerHTML +=
                    `<div class="card col-lg-3 col-md-4 col-sm-6 my-3 yellowBg">
                    <div class="card-body d-flex flex-column gap-3 justify-content-evenly align-items-evenly">
                      <h5 class="card-title" id="noteTitle">${json.data[i].title}</h5>
                      <p class="card-text" id="noteText">${json.data[i].text}</p>
                      <div class="buttonBox row justify-content-around">
                        <button href="#" id="edit" class=" col-xl-4 col-lg-5 col-5 violetBg" onclick="editNote('${json.data[i]._id}','${json.data[i].title}','${json.data[i].text}')">Edit</button>
                        <button href="#" id="delete" class="col-xl-4 col-lg-5 col-5 violetBg" onclick="deleteNote('${json.data[i]._id}')">Delete</button>
                    </div>
                    </div>
                  </div>`
            }
        });
}

async function editNote(id){
    await fetch(`http://localhost:8080/update/${id}`,{
        method: "PUT",
        body: JSON.stringify({
            title: title.value,
            text: text.value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    title.value = title.value;
    text.value = text.value;
    getAllNotes();
    title.value = '';
    text.value = '';
}

async function confirmDelete(){
  const response =  await fetch(`http://localhost:8080/delete/${noteToBeDeleted}`, {
        method: "DELETE",
    });
    getAllNotes();
    popUp.classList.remove('visible');
    msgErr.classList.add('success');
    msgErr.innerHTML = 'Successfully Deleted';
    setTimeout(() => msgErr.innerHTML = '', 2000);
    setTimeout(() => msgErr.classList.remove('success'), 2000);
}

function cancelDelete(){
    popUp.classList.remove('visible');
}

 function deleteNote(uniqueId) {
    noteToBeDeleted = uniqueId;
    popUp.classList.add('visible');
}

form.addEventListener('submit', onSubmit);
async function onSubmit(e) {
    e.preventDefault();
    if (title.value.trim() === '' || text.value.trim() === '') {
        msgErr.classList.add('fail');
        msgErr.innerHTML = 'Please enter all fields';
        setTimeout(() => msgErr.innerHTML = '', 2000);
        setTimeout(() => msgErr.classList.remove('fail'), 2000);
        // msgErr.classList.remove('fail');
    }
    else {
        await fetch("http://localhost:8080/addNotes", {
            method: "POST",
            body: JSON.stringify({
                title: title.value,
                text: text.value,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },

        });
        taskContainer.innerHTML = '';
        getAllNotes();
        title.value = '';
        task.value = '';
        msgErr.classList.add('success');
        msgErr.innerHTML = 'Successfully added';
        setTimeout(() => msgErr.innerHTML = '', 2000);
        setTimeout(() => msgErr.classList.remove('success'), 2000);
        // msgErr.classList.remove('success');
    }
}



getAllNotes();
