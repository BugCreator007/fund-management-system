package com.fund.controller;

import com.fund.dto.RefundDTO;
import com.fund.service.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/refunds")
@CrossOrigin(origins = "*")
public class RefundController {

    @Autowired
    private RefundService refundService;

    @GetMapping
    public ResponseEntity<List<RefundDTO>> getAllRefunds() {
        return ResponseEntity.ok(refundService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RefundDTO> getRefundById(@PathVariable Long id) {
        return ResponseEntity.ok(refundService.findById(id));
    }

    @PostMapping
    public ResponseEntity<RefundDTO> createRefund(@RequestBody RefundDTO refundDTO) {
        return ResponseEntity.ok(refundService.create(refundDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RefundDTO> updateRefund(@PathVariable Long id, @RequestBody RefundDTO refundDTO) {
        return ResponseEntity.ok(refundService.update(id, refundDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteRefund(@PathVariable Long id) {
        refundService.delete(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "删除成功");
        return ResponseEntity.ok(response);
    }
}
