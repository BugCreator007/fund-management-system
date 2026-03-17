package com.fund.service;

import com.fund.dto.RefundDTO;
import com.fund.entity.Refund;
import com.fund.repository.RefundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RefundService {

    @Autowired
    private RefundRepository refundRepository;

    public List<RefundDTO> findAll() {
        return refundRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public RefundDTO findById(Long id) {
        Refund refund = refundRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("退款记录不存在"));
        return convertToDTO(refund);
    }

    @Transactional
    public RefundDTO create(RefundDTO refundDTO) {
        Refund refund = convertToEntity(refundDTO);
        refund.setRefundNo(generateRefundNo());
        refund.setCreateTime(LocalDateTime.now());
        refund.setUpdateTime(LocalDateTime.now());
        Refund saved = refundRepository.save(refund);
        return convertToDTO(saved);
    }

    @Transactional
    public RefundDTO update(Long id, RefundDTO refundDTO) {
        Refund existing = refundRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("退款记录不存在"));
        
        existing.setOriginalPaymentNo(refundDTO.getOriginalPaymentNo());
        existing.setCustomerName(refundDTO.getCustomerName());
        existing.setAmount(refundDTO.getAmount());
        existing.setRefundMethod(refundDTO.getRefundMethod());
        existing.setStatus(refundDTO.getStatus());
        existing.setReason(refundDTO.getReason());
        existing.setBankAccount(refundDTO.getBankAccount());
        existing.setTransactionNo(refundDTO.getTransactionNo());
        existing.setRefundTime(refundDTO.getRefundTime());
        existing.setUpdateTime(LocalDateTime.now());
        
        Refund updated = refundRepository.save(existing);
        return convertToDTO(updated);
    }

    @Transactional
    public void delete(Long id) {
        refundRepository.deleteById(id);
    }

    private String generateRefundNo() {
        return "REF" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    }

    private RefundDTO convertToDTO(Refund refund) {
        return RefundDTO.builder()
                .id(refund.getId())
                .refundNo(refund.getRefundNo())
                .originalPaymentNo(refund.getOriginalPaymentNo())
                .customerName(refund.getCustomerName())
                .amount(refund.getAmount())
                .refundMethod(refund.getRefundMethod())
                .status(refund.getStatus())
                .reason(refund.getReason())
                .bankAccount(refund.getBankAccount())
                .transactionNo(refund.getTransactionNo())
                .refundTime(refund.getRefundTime())
                .createTime(refund.getCreateTime())
                .updateTime(refund.getUpdateTime())
                .build();
    }

    private Refund convertToEntity(RefundDTO dto) {
        return Refund.builder()
                .id(dto.getId())
                .refundNo(dto.getRefundNo())
                .originalPaymentNo(dto.getOriginalPaymentNo())
                .customerName(dto.getCustomerName())
                .amount(dto.getAmount())
                .refundMethod(dto.getRefundMethod())
                .status(dto.getStatus())
                .reason(dto.getReason())
                .bankAccount(dto.getBankAccount())
                .transactionNo(dto.getTransactionNo())
                .refundTime(dto.getRefundTime())
                .build();
    }
}
