package com.exam.controllar;


import com.exam.model.Product;
import com.exam.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
public class productControllar {

    @Autowired
    private ProductRepository pr;

    @GetMapping("/product/all")
    public List<Product> getAllProduct(){

        return pr.findAll();

    }
    @PostMapping("/product/save")
    public Product save(@RequestBody Product product){

        return pr.save(product);
    }
    @GetMapping("/product/delete/{id}")
    public void delete(@PathVariable(value = "id") int id){
        pr.deleteById(id);

    }
}
