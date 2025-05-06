package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="tasks_table")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String time;
    private boolean done = false;
    
    //  Task ID Getter and Setter
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }

    //  Task name Getter and Setter
    public String getname(){
        return this.name;
    }
    public void setname(String name){
        this.name = name;
    }

    //  Time Getter and Setter
    public String getTime(){
        return this.time;
    }
    public void setTime(String time){
        this.time = time;
    }

    //  Task status Getter and Setter
    public boolean getIsDone(){
        return this.done;
    }
    public void setIsDone(boolean done){
        this.done = done;
    }
}
