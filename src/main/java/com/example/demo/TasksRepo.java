package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TasksRepo extends JpaRepository<Task, Long>{
    List<Task> findByDone(boolean done);
}
