package com.fund.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String invoiceNo;
    
    @Column(nullable = false)
    private String invoiceType;
    
    @Column(nullable = false)
    private String customerName;
    
    @Column(nullable = false)
    private String customerTaxNo;
    
    @Column(nullable = false)
    private BigDecimal amount;
    
    @Column(nullable = false)
    private BigDecimal taxAmount;
    
    @Column(nullable = false)
    private String status;
    
    private String relatedPaymentNo;
    
    private String title;
    
    private String content;
    
    @Column(nullable = false)
    private LocalDateTime invoiceDate;
    
    @Column(nullable = false)
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
    
    @PrePersist
    protected void onCreate() {
        createTime = LocalDateTime.now();
        if (invoiceDate == null) {
            invoiceDate = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updateTime = LocalDateTime.now();
    }
}
