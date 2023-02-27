package com.exam.controllar;

import com.exam.model.Invoice;
import com.exam.model.InvoiceIndex;
import com.exam.model.Product;
import com.exam.repository.InvoiceIndexRepository;
import com.exam.repository.InvoiceRepository;
import com.exam.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
public class InvoiceController {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private InvoiceIndexRepository invoiceIndexRepo;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/invoices/save")
    public List<Invoice> invoiceSave(
            @RequestBody List<Product> products){
        InvoiceIndex indexEntity= new InvoiceIndex();
        indexEntity = invoiceIndexRepo.save(indexEntity);
        List<Invoice> invoices = new ArrayList<>();
        for(Product product: products){
           Product dbProduct = productRepository.getReferenceById(product.getId());
            int quantity = dbProduct.getQuantity();
            if(quantity>=product.getQuantity()){
                //update product
                int newQty = quantity - product.getQuantity();
                dbProduct.setQuantity(newQty);
                productRepository.save(dbProduct);
                // create invoice
                Invoice invoice = new Invoice();
                invoice.setProductId(product.getId());
                invoice.setProductName(product.getProductName());
                invoice.setQuantity(product.getQuantity());
                invoice.setPrice(product.getPrice());
                invoice.setInvoiceNo(indexEntity.getInvoiceNo());
                invoice = invoiceRepository.save(invoice);
                invoices.add(invoice);
            }else{
                throw new RuntimeException("Invoice is not generated");
            }
        }
        return invoices;
    }

    @GetMapping("/invoices/index/all")
    public List<InvoiceIndex> getAllInvoiceIndex(){
        return invoiceIndexRepo.findAll();
    }

    @GetMapping("/invoices/all/{invoiceNo}")
    public List<Invoice> getAllInvoices(@PathVariable(value = "invoiceNo") int invoiceNo){
        return invoiceRepository.findAllByInvoiceNo(invoiceNo);
    }


}
