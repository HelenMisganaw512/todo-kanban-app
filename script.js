const form = document.querySelector('form');
const input = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const inprogressList = document.querySelector('#inprogress-list');
const completedList = document.querySelector('#completed-list');

let tasks = [];
function saveTasks(){
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}
function renderTasks() {
    todoList.innerHTML ='';
    inprogressList.innerHTML = '';
    completedList.innerHTML ='';

    tasks.forEach(function(task){
        const listItem = document.createElement('li');
        listItem.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        listItem.appendChild(deleteBtn);

        deleteBtn.addEventListener('click' , function(event) {
            event.stopPropagation();
            tasks = tasks.filter(function(t) {return t !== task;})// filter is a method used to delete a task that we want from the list so it means keep every task except this one//
            saveTasks();//persist it or save the updated value//
            renderTasks();//redraw everything to refelect the change //
        });
        if (task.status === 'todo'){
            const startBtn =document.createElement('button');
            startBtn.textContent = 'Start'
            listItem.appendChild(startBtn) ;
            startBtn.addEventListener('click' , function(event){
                event.stopPropagation();
                task.status = 'inprogress';
                saveTasks();
                renderTasks();


            });
            todoList.appendChild(listItem);
        }else if (task.status === 'inprogress'){
            const completeBtn = document.createElement('button');
            completeBtn.textContent= 'Complete';
            listItem.appendChild(completeBtn);
            completeBtn.addEventListener('click' , function(event){
                event.stopPropagation();
                task.status = 'completed';
                saveTasks();
                renderTasks();
            });
            inprogressList.appendChild(listItem);
        }else{
            completedList.appendChild(listItem);
        }
    });
}
form.addEventListener('submit', function(event){
    event.preventDefault();
    const taskText = input.value;
    if (taskText.trim() === '') {
    return;
}

    tasks.push({ text: taskText, status: 'todo' });

    saveTasks();
    renderTasks();
    input.value = '';
});

const savedTasks = localStorage.getItem('tasks');
if (savedTasks){
    tasks = JSON.parse(savedTasks);//converts the string that was stroed back to a real array of task object//
}
renderTasks();//draws the restored tasks onto the page immediately when it loads//