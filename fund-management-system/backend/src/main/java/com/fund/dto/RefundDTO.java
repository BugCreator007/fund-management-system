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
public class RefundDTO {
    private Long id;
    private String refundNo;
    private String originalPaymentNo;
    private String customerName;
    private BigDecimal amount;
    private String refundMethod;
    private String status;
    private String reason;
    private String bankAccount;
    private String transactionNo;
    private LocalDateTime refundTime;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
