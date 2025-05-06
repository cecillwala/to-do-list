document.addEventListener('DOMContentLoaded', () => {
    ListTasks();
});

async function AddTask(event){ 
    event.preventDefault(); 
    const task = document.getElementsByName("task")[0].value;
    const time = document.getElementsByName("time")[0].value;
    const response = await fetch("/new-task", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: task,
            time: time,
            done: false
        })
    });
    document.getElementsByName("task")[0].value = "";
    document.getElementsByName("time")[0].value = "";
    ListTasks();
}

async function ListTasks(){
    const complete_response = await fetch("/list-complete-tasks");
    const done = await complete_response.json();
    const completed = document.getElementById("completed-tasks");
    completed.innerHTML = "";

    const response = await fetch("/list-tasks");
    const data = await response.json();
    console.log(data);
    const tasks = document.getElementById("tasks");
    tasks.innerHTML = "";

    if (done.length < 1){
        const message = document.createElement("h2");
        message.innerHTML = "No tasks are completed";
        completed.append(message);
    }
    else{
        for (let i= 0; i < done.length; i++){
            const task = document.createElement('div');
            const name = document.createElement('span');
            const status  = document.createElement('span');
            const message  = document.createElement('span');
            const remove = document.createElement('span');
            const br = document.createElement('br');
            remove.setAttribute('class', 'done-btn');
            remove.innerHTML = "x";
            remove.addEventListener("click", () => {RemoveTask(done[i].id)})
            task.setAttribute('class', 'complete-task');
            name.innerHTML = `${i + 1}. ${done[i].name}`;
            status.innerHTML = `...`;
            message.innerHTML = `Task completed!`;
            task.append(name, status, message, remove);
            completed.append(task, br);
        }
    }


    if (data.length < 1){
        const message = document.createElement("h2");
        message.innerHTML = "No new tasks";
        tasks.append(message);
    }
    else{
        for (let i= 0; i < data.length; i++){
            const task = document.createElement('div');
            const name = document.createElement('span');
            const time  = document.createElement('span');
            const status  = document.createElement('span');
            status.innerHTML = "...";
            const message  = document.createElement('span');
            message.innerHTML = "To Be Done";
            const done = document.createElement('button');
            done.setAttribute('class', 'done-btn');
            const hr = document.createElement('hr');
            done.innerHTML = "Done";
            done.addEventListener("click", () => {MarkTaskDone(data[i].id)})
            task.setAttribute('class', 'task');
            name.innerHTML = `${i + 1}. ${data[i].name}`;
            time.innerHTML = data[i].time;
            task.append(name, time, status, message, done);
            tasks.append(task, hr);
        }
    }
}

async function RemoveTask(id){
    const response = await fetch(`/remove_task/${id}`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:id
        })
    });
    ListTasks();
}


async function MarkTaskDone(id){
    const response = await fetch(`/mark_done/${id}`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            is_done:true
        })
    });
    ListTasks();
}


async function RemoveAllTasks(){
    const response = await fetch(`/remove_all_tasks`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:"Clear all tasks"
        })
    });
    ListTasks();
}