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
            task: task,
            time: time,
        })
    });
    document.getElementsByName("task")[0].value = "";
    document.getElementsByName("time")[0].value = "";
    ListTasks();
}

async function ListTasks(){
    const response = await fetch("/list-tasks");
    const data = await response.json();
    console.log(data);
    const tasks = document.getElementById("tasks");
    tasks.innerHTML = "";

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
            const done = document.createElement('button');
            done.setAttribute('class', 'done-btn');
            const hr = document.createElement('hr');
            done.innerHTML = "Done";
            done.addEventListener("click", () => {RemoveTask(data[i].id)})
            task.setAttribute('class', 'task');
            name.innerHTML = `${i + 1}. ${data[i].task}`;
            time.innerHTML = data[i].time;
            task.append(name, time, done);
            tasks.append(task, hr);
        }

        const clear = document.createElement('button');
        clear.innerHTML = "Clear all tasks";
        clear.addEventListener("click", () => {RemoveAllTasks});
        clear.setAttribute('class', 'clear-btn');
        tasks.append(clear);
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