import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 收款管理API
export const paymentApi = {
  getAll: () => api.get('/payments'),
  getById: (id) => api.get(`/payments/${id}`),
  create: (data) => api.post('/payments', data),
  update: (id, data) => api.put(`/payments/${id}`, data),
  delete: (id) => api.delete(`/payments/${id}`),
};

// 退款管理API
export const refundApi = {
  getAll: () => api.get('/refunds'),
  getById: (id) => api.get(`/refunds/${id}`),
  create: (data) => api.post('/refunds', data),
  update: (id, data) => api.put(`/refunds/${id}`, data),
  delete: (id) => api.delete(`/refunds/${id}`),
};

// 发票管理API
export const invoiceApi = {
  getAll: () => api.get('/invoices'),
  getById: (id) => api.get(`/invoices/${id}`),
  create: (data) => api.post('/invoices', data),
  update: (id, data) => api.put(`/invoices/${id}`, data),
  delete: (id) => api.delete(`/invoices/${id}`),
};

export default api;
