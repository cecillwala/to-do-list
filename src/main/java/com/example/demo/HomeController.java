package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


@Controller
public class HomeController {

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
        return repo.findAll();
    }

}
