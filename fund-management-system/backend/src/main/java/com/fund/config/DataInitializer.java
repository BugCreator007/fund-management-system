package com.fund.config;

import com.fund.entity.Payment;
import com.fund.entity.Refund;
import com.fund.entity.Invoice;
import com.fund.repository.PaymentRepository;
import com.fund.repository.RefundRepository;
import com.fund.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RefundRepository refundRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public void run(String... args) {
        initPayments();
        initRefunds();
        initInvoices();
    }

    private void initPayments() {
        Payment payment1 = Payment.builder()
                .paymentNo("PAY202403170001")
                .customerName("张三科技有限公司")
                .amount(new BigDecimal("15000.00"))
                .paymentMethod("银行转账")
                .status("已完成")
                .description("软件服务费")
                .bankAccount("6222021234567890123")
                .transactionNo("TRX202403170001")
                .paymentTime(LocalDateTime.now().minusDays(5))
                .createTime(LocalDateTime.now().minusDays(5))
                .build();

        Payment payment2 = Payment.builder()
                .paymentNo("PAY202403160002")
                .customerName("李四贸易公司")
                .amount(new BigDecimal("28000.00"))
                .paymentMethod("支付宝")
                .status("已完成")
                .description("咨询服务费")
                .bankAccount("alipay@lisi.com")
                .transactionNo("TRX202403160002")
                .paymentTime(LocalDateTime.now().minusDays(6))
                .createTime(LocalDateTime.now().minusDays(6))
                .build();

        Payment payment3 = Payment.builder()
                .paymentNo("PAY202403150003")
                .customerName("王五实业集团")
                .amount(new BigDecimal("50000.00"))
                .paymentMethod("微信支付")
                .status("处理中")
                .description("项目开发费")
                .bankAccount("wechat@wangwu.com")
                .transactionNo("TRX202403150003")
                .paymentTime(LocalDateTime.now().minusDays(7))
                .createTime(LocalDateTime.now().minusDays(7))
                .build();

        paymentRepository.save(payment1);
        paymentRepository.save(payment2);
        paymentRepository.save(payment3);
    }

    private void initRefunds() {
        Refund refund1 = Refund.builder()
                .refundNo("REF202403170001")
                .originalPaymentNo("PAY202403100001")
                .customerName("张三科技有限公司")
                .amount(new BigDecimal("5000.00"))
                .refundMethod("原路退回")
                .status("已完成")
                .reason("服务不满意")
                .bankAccount("6222021234567890123")
                .transactionNo("TRXREF202403170001")
                .refundTime(LocalDateTime.now().minusDays(2))
                .createTime(LocalDateTime.now().minusDays(2))
                .build();

        Refund refund2 = Refund.builder()
                .refundNo("REF202403160002")
                .originalPaymentNo("PAY202403090002")
                .customerName("李四贸易公司")
                .amount(new BigDecimal("3000.00"))
                .refundMethod("银行转账")
                .status("处理中")
                .reason("订单取消")
                .bankAccount("6222029876543210987")
                .transactionNo("TRXREF202403160002")
                .refundTime(LocalDateTime.now().minusDays(3))
                .createTime(LocalDateTime.now().minusDays(3))
                .build();

        refundRepository.save(refund1);
        refundRepository.save(refund2);
    }

    private void initInvoices() {
        Invoice invoice1 = Invoice.builder()
                .invoiceNo("INV202403170001")
                .invoiceType("增值税专用发票")
                .customerName("张三科技有限公司")
                .customerTaxNo("91110108MA00123456")
                .amount(new BigDecimal("15000.00"))
                .taxAmount(new BigDecimal("849.06"))
                .status("已开具")
                .relatedPaymentNo("PAY202403170001")
                .title("软件服务费")
                .content("技术服务")
                .invoiceDate(LocalDateTime.now().minusDays(4))
                .createTime(LocalDateTime.now().minusDays(4))
                .build();

        Invoice invoice2 = Invoice.builder()
                .invoiceNo("INV202403160002")
                .invoiceType("增值税普通发票")
                .customerName("李四贸易公司")
                .customerTaxNo("91110108MA00654321")
                .amount(new BigDecimal("28000.00"))
                .taxAmount(new BigDecimal("1584.91"))
                .status("已开具")
                .relatedPaymentNo("PAY202403160002")
                .title("咨询服务费")
                .content("咨询服务")
                .invoiceDate(LocalDateTime.now().minusDays(5))
                .createTime(LocalDateTime.now().minusDays(5))
                .build();

        Invoice invoice3 = Invoice.builder()
                .invoiceNo("INV202403150003")
                .invoiceType("增值税专用发票")
                .customerName("王五实业集团")
                .customerTaxNo("91110108MA00987654")
                .amount(new BigDecimal("50000.00"))
                .taxAmount(new BigDecimal("2830.19"))
                .status("待开具")
                .relatedPaymentNo("PAY202403150003")
                .title("项目开发费")
                .content("软件开发")
                .invoiceDate(LocalDateTime.now().minusDays(6))
                .createTime(LocalDateTime.now().minusDays(6))
                .build();

        invoiceRepository.save(invoice1);
        invoiceRepository.save(invoice2);
        invoiceRepository.save(invoice3);
    }
}
