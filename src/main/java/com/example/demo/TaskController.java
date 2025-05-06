package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


@Controller
public class TaskController {

    @Autowired
    private TasksRepo repo;

    @RequestMapping("/")
    public String index() {
        return "forward:/index.html";
    }

    @PostMapping("/new-task")
    @ResponseBody
    public void new_task(@RequestBody Task task){
        repo.save(task);
    }

    @GetMapping("/list-tasks")
    @ResponseBody
    public List<Task> list_tasks(){
        return repo.findByDone(false);
    }


    @GetMapping("/list-complete-tasks")
    @ResponseBody
    public List<Task> list_complete_tasks(){
        return repo.findByDone(true);
    }


    @PutMapping("/mark_done/{id}")
    @ResponseBody
    public void mark_task_done(@PathVariable Long id){
        Task task = repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        task.setIsDone(true);
        repo.save(task);
    }

    @DeleteMapping("/remove_task/{id}")
    @ResponseBody
    public void remove_task(@PathVariable Long id){
        repo.deleteById(id);
    }

    @DeleteMapping("/remove_all_tasks")
    @ResponseBody
    public void remove_all_tasks(){
        repo.deleteAll();
    }

}
