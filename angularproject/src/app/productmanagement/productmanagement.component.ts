import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  products: any = [];
  isEdit = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      id: [],
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      remarks: ['',]
    });
  }

  ngOnInit(): void {
    this.showAll();
  }
  get f() {
    return this.form.controls;
  }

  // save() {
  //   this.submitted = true;
  //   if (this.form.valid) {
  //     let formData = this.form.value;
  //     console.log(formData);
  //   }
  //   else {
  //     alert("Form validation failed!")
  //   }
  // }

  save(){
    this.submitted = true;
    if(this.form.valid){

      let url = 'http://localhost:9001/product/save/';
      let data = this.form.value;
      this.http.post(url, data).subscribe({
        next: response => {
          alert("Data was saved successful.")
        },
        error: err =>{
          alert("Data was saved failed!, Please try again.")

        }
      });
    }else{
      console.log("invalid");
    }
 }
 showAll(){
  let url = 'http://localhost:9001/product/all';
  this.http.get(url).subscribe({
    next: response =>{
      this.products = response;
    },
    error: err =>{
      console.log(err);        
    }
  })
}

edit(product: any){
  this.form.setValue({
    id: product.id,
    productName: product.productName,
    quantity: product.quantity,
    price: product.price,
    remarks: product.remarks
   
  });
  this.isEdit = true;
}

deleteById(id: number){
  let url = 'http://localhost:9001/product/delete/'+id;
  this.http.get(url).subscribe({
    next: response =>{
      alert("Recored was deleted.");
    },
    error: err =>{
      alert("Recored deletation failed!.");
    }
  })
}

relode(){
  window.location.reload();
}





}
