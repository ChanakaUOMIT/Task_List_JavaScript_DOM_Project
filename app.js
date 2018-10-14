//Define UI Vars

const form = document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //Remove task Event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter task Event
    filter.addEventListener('keyup', filterTasks)
}

//Get Tasks From LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } 
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li Element
        const li=document.createElement('li');
        //Add class
        li.className='collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create a new link element
        const link=document.createElement('a');
        //Add class
        link.className='delete-item secondary-content';
        //Add icon html
        link.innerHTML= '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link); 
         //Append li to the ul
        taskList.appendChild(li);
    });

}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task')
    }
    //create li Element
    const li=document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create a new link element
    const link=document.createElement('a');
    //Add class
    link.className='delete-item secondary-content';
    //Add icon html
    link.innerHTML= '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link); 

    //console.log(li);
   // console.log(link);


    //Append li to the ul
    taskList.appendChild(li);
    //console.log(taskList);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value='';
    
    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } 
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        //console.log(e.target);
        if(confirm('Are you Sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove From LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        
    }

    /*console.log(e);*/
    //console.log(e.target);
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    //console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } 
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){ 
    //taskList.innerHTML='';

    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear from LS
    clearTasksFromLocalStorage();
}

//clear Tasks From LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
    const text=e.target.value.toLowerCase();

    console.log(text);
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item=task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display='block'; 
            }
            else{
                task.style.display='none';
            }

        }
    );
}