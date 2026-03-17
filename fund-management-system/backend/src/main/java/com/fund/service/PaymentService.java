package com.fund.service;

import com.fund.dto.PaymentDTO;
import com.fund.entity.Payment;
import com.fund.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<PaymentDTO> findAll() {
        return paymentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PaymentDTO findById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("收款记录不存在"));
        return convertToDTO(payment);
    }

    @Transactional
    public PaymentDTO create(PaymentDTO paymentDTO) {
        Payment payment = convertToEntity(paymentDTO);
        payment.setPaymentNo(generatePaymentNo());
        payment.setCreateTime(LocalDateTime.now());
        payment.setUpdateTime(LocalDateTime.now());
        Payment saved = paymentRepository.save(payment);
        return convertToDTO(saved);
    }

    @Transactional
    public PaymentDTO update(Long id, PaymentDTO paymentDTO) {
        Payment existing = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("收款记录不存在"));
        
        existing.setCustomerName(paymentDTO.getCustomerName());
        existing.setAmount(paymentDTO.getAmount());
        existing.setPaymentMethod(paymentDTO.getPaymentMethod());
        existing.setStatus(paymentDTO.getStatus());
        existing.setDescription(paymentDTO.getDescription());
        existing.setBankAccount(paymentDTO.getBankAccount());
        existing.setTransactionNo(paymentDTO.getTransactionNo());
        existing.setPaymentTime(paymentDTO.getPaymentTime());
        existing.setUpdateTime(LocalDateTime.now());
        
        Payment updated = paymentRepository.save(existing);
        return convertToDTO(updated);
    }

    @Transactional
    public void delete(Long id) {
        paymentRepository.deleteById(id);
    }

    private String generatePaymentNo() {
        return "PAY" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    }

    private PaymentDTO convertToDTO(Payment payment) {
        return PaymentDTO.builder()
                .id(payment.getId())
                .paymentNo(payment.getPaymentNo())
                .customerName(payment.getCustomerName())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .status(payment.getStatus())
                .description(payment.getDescription())
                .bankAccount(payment.getBankAccount())
                .transactionNo(payment.getTransactionNo())
                .paymentTime(payment.getPaymentTime())
                .createTime(payment.getCreateTime())
                .updateTime(payment.getUpdateTime())
                .build();
    }

    private Payment convertToEntity(PaymentDTO dto) {
        return Payment.builder()
                .id(dto.getId())
                .paymentNo(dto.getPaymentNo())
                .customerName(dto.getCustomerName())
                .amount(dto.getAmount())
                .paymentMethod(dto.getPaymentMethod())
                .status(dto.getStatus())
                .description(dto.getDescription())
                .bankAccount(dto.getBankAccount())
                .transactionNo(dto.getTransactionNo())
                .paymentTime(dto.getPaymentTime())
                .build();
    }
}
