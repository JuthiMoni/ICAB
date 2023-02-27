package com.exam.repository;

import com.exam.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {
    List<Invoice> findAllByInvoiceNo(int invoiceNo);
}
