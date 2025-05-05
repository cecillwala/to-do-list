document.addEventListener('DOMContentLoaded', () => {
    ListTasks();
});

async function AddTask(event){ 
    event.preventDefault(); 
    const response = await fetch("/new-task", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task:document.getElementsByName("task")[0].value,
            time:document.getElementsByName("time")[0].value,
        })
    });
    const data = await response.json();
    console.log(data);
    ListTasks();
}

async function ListTasks(){
    const response = await fetch("/list-tasks");
    const data = await response.json();
    console.log(data);
}