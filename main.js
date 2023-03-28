function addToList(){
    const listUnit = document.getElementById("listUnit"); 

    if(listUnit.value.length < 2) return

    appendLi(listUnit.value);

    listUnit.value = "";

    saveTasks()
}

function checkUndefinedOrNull(value){
    return value === null || value === undefined
}

function saveTasks(){
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("toDoList", document.getElementById('toDoList').innerHTML);
    } else {
        // No web storage Support.
    }
}

function loadTasks(){
    if (typeof(Storage) !== "undefined") {
        const tasks = localStorage.getItem(`toDoList`);
        document.getElementById('toDoList').innerHTML = (!checkUndefinedOrNull(tasks) ? tasks : "")
    } else {
        //do nothing
    }
}

function appendLi(words){
    const ul = document.getElementById('toDoList')
    const buttonClose = `<button id="close" class="button buttonClose" onclick="deleteFromList(this)">Cancel</button>`
    const buttonCheck = `<button id="check" class="button buttonCheck" onclick="strikeElement(this)">Done</button>`
    const li = `<li>${words} ${buttonCheck}${buttonClose}</li>`

    ul.innerHTML = li + ul.innerHTML
}

function deleteFromList(element){
    const parentElement = element.parentNode;
    parentElement.remove();

    saveTasks();
}

function strikeElement(element){
    const parentElement = element.parentNode;
    parentElement.remove();

    parentElement.style.setProperty('text-decoration', 'line-through');
    parentElement.querySelector("#check").remove()

    document.getElementById('toDoList').appendChild(parentElement);

    saveTasks();
}

function clickPress(event) {
    if (event.key == "Enter") {
        addToList()
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadTasks();
});