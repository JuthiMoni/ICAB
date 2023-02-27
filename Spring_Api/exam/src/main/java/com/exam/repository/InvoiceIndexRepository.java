package com.exam.repository;

import com.exam.model.InvoiceIndex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface InvoiceIndexRepository extends JpaRepository<InvoiceIndex,Integer> {
}
