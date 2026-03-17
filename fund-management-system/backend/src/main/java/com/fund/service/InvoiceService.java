package com.fund.service;

import com.fund.dto.InvoiceDTO;
import com.fund.entity.Invoice;
import com.fund.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<InvoiceDTO> findAll() {
        return invoiceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public InvoiceDTO findById(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("发票记录不存在"));
        return convertToDTO(invoice);
    }

    @Transactional
    public InvoiceDTO create(InvoiceDTO invoiceDTO) {
        Invoice invoice = convertToEntity(invoiceDTO);
        invoice.setInvoiceNo(generateInvoiceNo());
        invoice.setCreateTime(LocalDateTime.now());
        invoice.setUpdateTime(LocalDateTime.now());
        Invoice saved = invoiceRepository.save(invoice);
        return convertToDTO(saved);
    }

    @Transactional
    public InvoiceDTO update(Long id, InvoiceDTO invoiceDTO) {
        Invoice existing = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("发票记录不存在"));
        
        existing.setInvoiceType(invoiceDTO.getInvoiceType());
        existing.setCustomerName(invoiceDTO.getCustomerName());
        existing.setCustomerTaxNo(invoiceDTO.getCustomerTaxNo());
        existing.setAmount(invoiceDTO.getAmount());
        existing.setTaxAmount(invoiceDTO.getTaxAmount());
        existing.setStatus(invoiceDTO.getStatus());
        existing.setRelatedPaymentNo(invoiceDTO.getRelatedPaymentNo());
        existing.setTitle(invoiceDTO.getTitle());
        existing.setContent(invoiceDTO.getContent());
        existing.setInvoiceDate(invoiceDTO.getInvoiceDate());
        existing.setUpdateTime(LocalDateTime.now());
        
        Invoice updated = invoiceRepository.save(existing);
        return convertToDTO(updated);
    }

    @Transactional
    public void delete(Long id) {
        invoiceRepository.deleteById(id);
    }

    private String generateInvoiceNo() {
        return "INV" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    }

    private InvoiceDTO convertToDTO(Invoice invoice) {
        return InvoiceDTO.builder()
                .id(invoice.getId())
                .invoiceNo(invoice.getInvoiceNo())
                .invoiceType(invoice.getInvoiceType())
                .customerName(invoice.getCustomerName())
                .customerTaxNo(invoice.getCustomerTaxNo())
                .amount(invoice.getAmount())
                .taxAmount(invoice.getTaxAmount())
                .status(invoice.getStatus())
                .relatedPaymentNo(invoice.getRelatedPaymentNo())
                .title(invoice.getTitle())
                .content(invoice.getContent())
                .invoiceDate(invoice.getInvoiceDate())
                .createTime(invoice.getCreateTime())
                .updateTime(invoice.getUpdateTime())
                .build();
    }

    private Invoice convertToEntity(InvoiceDTO dto) {
        return Invoice.builder()
                .id(dto.getId())
                .invoiceNo(dto.getInvoiceNo())
                .invoiceType(dto.getInvoiceType())
                .customerName(dto.getCustomerName())
                .customerTaxNo(dto.getCustomerTaxNo())
                .amount(dto.getAmount())
                .taxAmount(dto.getTaxAmount())
                .status(dto.getStatus())
                .relatedPaymentNo(dto.getRelatedPaymentNo())
                .title(dto.getTitle())
                .content(dto.getContent())
                .invoiceDate(dto.getInvoiceDate())
                .build();
    }
}
