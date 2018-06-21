//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load All Event Listeners
loadEventListeners();

function loadEventListeners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add Task Event
    form.addEventListener('submit',addTask);
    //Remove Task Event
    taskList.addEventListener('click',removeTask);
    //Clear Task Event
    clearBtn.addEventListener('click',clearTasks);
    //Filter Tasks Event
    filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from LocalStorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Create li Element
        const li=document.createElement('li');
        //Add class
        li.className='collection-item';
        //Create a Text Node & append it to li
        li.appendChild(document.createTextNode(task));
        //Create new link Element
        const link=document.createElement('a');
        //Add class
        link.className='delete-item secondary-content';
        //Add Icon Html
        link.innerHTML='<i class="fa fa-remove"></i>'
        //Append the link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    })
}

//Add Task
function addTask(e){
    if(taskInput.value===""){
        alert("Add a Task");
    }
    else{
    //Create li Element
    const li=document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create a Text Node & append it to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link Element
    const link=document.createElement('a');
    //Add class
    link.className='delete-item secondary-content';
    //Add Icon Html
    link.innerHTML='<i class="fa fa-remove"></i>'
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store into LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value='';
    e.preventDefault();
    }
}

//Store Task
function storeTaskInLocalStorage(task){
    if(task != ""){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    }
}

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}    

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){
    // taskList.innerHTML="";
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksFromLocalStorage();
}

//Clear from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
    const text=e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    });
}

// const liOdd=document.querySelectorAll('li:nth-child(odd)');
// const liEven=document.querySelectorAll('li:nth-child(even)');

// liOdd.forEach(function(li,index){
//     li.style.background='#ccc';
// })

// liEven.forEach(function(li,index){
//     li.style.background='#f4f4f4';
// })