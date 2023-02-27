package com.exam.model;

import javax.persistence.*;

@Entity
@Table(name = "invoice_index")
public class InvoiceIndex {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int invoiceNo;

    public int getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(int invoiceNo) {
        this.invoiceNo = invoiceNo;
    }
}
