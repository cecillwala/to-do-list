package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TasksRepo extends JpaRepository<Task, Long>{
    
}
