import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salemanagement',
  templateUrl: './salemanagement.component.html',
  styleUrls: ['./salemanagement.component.css']
})
export class SalemanagementComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  products: any = [];
  saleProducts: any = [];
  invoiceIndexs: any = [];
  selectedProduct: any = { quantity: 0 };
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      id: [-1],
      productid: ['', Validators.required],
      quantity: ['', Validators.required],
      invoiceNo: [-1]
    })
  }

  ngOnInit(): void {
    this.showAll();
    this.getInvoicesIndexs();
  }
  get f() {
    return this.form.controls;
  }
  save() {


  }

  addProduct() {
    let isConfir = confirm("Are you add product?")
    if (isConfir) {
      // let sellProduct = {
      //   id: this.selectedProduct.id,
      //   productName: this.selectedProduct.productName,
      //   quantity: this.form.get('quantiy')?.value
      // }
      this.selectedProduct['quantity'] = this.form.get('quantity')?.value;
      this.saleProducts.push(this.selectedProduct);
      this.selectedProduct = { quantity: 0 }
      this.form.setValue({
        id: -1,
        productid: '',
        quantity: ''
      });
    }

  }

  getnerateInvoice() {
    let invoiceNo = this.form.get('invoiceNo')?.value;
    if (invoiceNo == '-1') {
      let url = 'http://localhost:9001/invoices/save';
      this.http.post(url, this.saleProducts).subscribe({
        next: response => {
          this.products = response;
          alert("Invoice was generated successfully")
        },
        error: err => {
          console.log(err);
        }
      })
    }else{
      alert("Invoice generated already")
    }

  }

  getInvoicesIndexs() {
    let url = 'http://localhost:9001/invoices/index/all';
    this.http.get(url).subscribe({
      next: response => {
        this.invoiceIndexs = response;
      },
      error: err => {
        console.log(err);
      }
    })

  }

  getInvoices() {
    let invoiceNo = this.form.get('invoiceNo')?.value;
    if (invoiceNo != '-1') {
      let url = 'http://localhost:9001/invoices/all/' + invoiceNo;
      this.http.get(url).subscribe({
        next: response => {
          this.saleProducts = response;
        },
        error: err => {
          console.log(err);
        }
      })
    } else {
      this.saleProducts = [];
    }

  }

  removeItem(index: number) {
    if (confirm("Are you add product?")) {
      this.saleProducts.splice(index, 1);
    }
  }

  productChange() {
    let index = (this.form.get('id')?.value);
    this.selectedProduct = this.products[index];
  }

  showAll() {
    let url = 'http://localhost:9001/product/all';
    this.http.get(url).subscribe({
      next: response => {
        this.products = response;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  printInvoice() {
    //Get the HTML of div
    var divElements = document.getElementById('printableInvoice')?.innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;
    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
      "<html><head><title></title></head><body>" +
      divElements + "</body>";
    //Print Page
    window.print();
    //Restore orignal HTML
    document.body.innerHTML = oldPage;

  }

}
