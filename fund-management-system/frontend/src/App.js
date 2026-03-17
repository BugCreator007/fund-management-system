import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import PaymentList from './pages/PaymentList';
import RefundList from './pages/RefundList';
import InvoiceList from './pages/InvoiceList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/payments" replace />} />
          <Route path="payments" element={<PaymentList />} />
          <Route path="refunds" element={<RefundList />} />
          <Route path="invoices" element={<InvoiceList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
