// Revealing  module design pattern

var todoListApp = (function(){
 let a =10;
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    // console.log('Working');
    
    
    // function fetchTodos(){
    //     fetch('https://jsonplaceholder.typicode.com/todos') // this returns a promise
    //     .then(function(response){
    //         // console.log(response);
    //         return response.json(); // this will also returns a promise
    //     }).then(function(data){
    //         // console.log(data);
    //         tasks = data.slice(0,10);
    //         renderList();
    //     })
    //     .catch(function(error){
    //         console.log('error', error);
    //     })
    // }
    
    // fetchTodos using async await
    async function fetchTodos(){
    
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json(); 
            tasks = data.slice(0,20);
            renderList();
        }
        catch(error){
            console.log(error);
        }
    }
    
    function addTaskToDOM(task){
    
         const li = document.createElement("li");
    
         li.innerHTML = 
         `
         <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
         <label for="${task.id}">${task.title}</label>
         <img src="delete.jpg" class="delete" data-id="${task.id}" />
        `;
    
        tasksList.append(li);
    }
    
    function renderList () {
        tasksList.innerHTML = '';
    
        for(let i = 0; i < tasks.length;i++){
            addTaskToDOM(tasks[i]);
        }
    
        tasksCounter.innerHTML = tasks.length;
    }
    
    
    
    
    function toggleTask(taskId) {
        // console.log(taskId);
        const  task = tasks.filter(function(task){
            return task.id === Number(taskId);
        });
        if(task.length > 0) {
            const currentTask = task[0];
    
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification("Task toggled Successfully");
            return;
        }
    
        showNotification("Could not toggle the task");
    
    }
    
    
    // ask this as a doubt in next session
    function deleteTask (taskId) {
        const  newTasks = tasks.filter(function(task){
            return task.id !== Number(taskId);
        })
    
        tasks = newTasks;
        renderList();
        showNotification('Task Deleted Successfully'); 
    
    }
    
    //Post 
    function addTask (task) {
        if(task){
            fetch("https://jsonplaceholder.typicode.com/todos",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({task}),
            }).then(function(response){
                return response.json();
            }).then (function (data){
                console.log(data);
                tasks.push(task);
                renderList();
                showNotification("Task Added Successfully");
            })
            .catch(function(error){
                console.log('error', error);
            })
    
    
                // tasks.push(task);
                // renderList();
                // showNotification("Task Added Successfully");
                // return;
        }
    
    }
    
    function showNotification(text) {
        alert(text);
    }
    
    
    function handleInputKeyPress(event){
    
        if (event.key === 'Enter'){
            const text = event.target.value;
            console.log(text);
    
            if(!text){
                showNotification("Task Text cannot be empty");
                return;
            }
    
            const task = {
                title: text, 
                id : Date.now(), // this is to user a unique id 
                completed: false // initially the task is marked false
            }
    
            event.target.value = ''; // it will make input empty after user typed the text and press enter to add task input got empty to take another task.
    
            addTask(task); // we call now addTask function to add the task
    
        }
    }
    
    // this will handle all the click events and give data to console.
    function handleClickListener(event){
        const target = event.target;
        // console.log(target);
    
        if(target.className === 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }else if( target.className ==='custom-checkbox'){
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    
    }
    
    
    function initializeApp(){
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputKeyPress);
        document.addEventListener('click', handleClickListener);
    }
    
    return{

        initialize: initializeApp,
        a:a
    }
})();
    
  
    
    