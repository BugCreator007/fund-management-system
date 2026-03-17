package com.fund.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDTO {
    private Long id;
    private String invoiceNo;
    private String invoiceType;
    private String customerName;
    private String customerTaxNo;
    private BigDecimal amount;
    private BigDecimal taxAmount;
    private String status;
    private String relatedPaymentNo;
    private String title;
    private String content;
    private LocalDateTime invoiceDate;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
