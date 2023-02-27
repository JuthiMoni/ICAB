package com.exam.controllar;

import com.exam.model.Student;
import com.exam.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
public class StudentControllar {
    @Autowired
    private StudentRepository str;

    @GetMapping("/student/getall")
    public List<Student> getAllStudent(){

        return str.findAll();

    }
    @PostMapping("/student/save")
    public Student save(@RequestBody Student student){

        return str.save(student);
    }
    @GetMapping("/student/delete/{id}")
    public void delete(@PathVariable(value = "id") int id){

        str.deleteById(id);
    }
}
