import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, DatePicker, Space, message } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { invoiceApi } from '../services/api';
import dayjs from 'dayjs';

const { Option } = Select;

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await invoiceApi.getAll();
      setInvoices(response.data);
    } catch (error) {
      message.error('获取发票列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (record) => {
    setCurrentInvoice(record);
    setIsViewMode(true);
    form.setFieldsValue({
      ...record,
      invoiceDate: record.invoiceDate ? dayjs(record.invoiceDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentInvoice(record);
    setIsViewMode(false);
    form.setFieldsValue({
      ...record,
      invoiceDate: record.invoiceDate ? dayjs(record.invoiceDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentInvoice(null);
    setIsViewMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条发票记录吗？',
      onOk: async () => {
        try {
          await invoiceApi.delete(id);
          message.success('删除成功');
          fetchInvoices();
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      const submitData = {
        ...values,
        invoiceDate: values.invoiceDate ? values.invoiceDate.format('YYYY-MM-DDTHH:mm:ss') : null,
      };

      if (currentInvoice) {
        await invoiceApi.update(currentInvoice.id, submitData);
        message.success('更新成功');
      } else {
        await invoiceApi.create(submitData);
        message.success('创建成功');
      }
      setIsModalVisible(false);
      fetchInvoices();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns = [
    {
      title: '发票编号',
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
    },
    {
      title: '发票类型',
      dataIndex: 'invoiceType',
      key: 'invoiceType',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount}`,
    },
    {
      title: '税额',
      dataIndex: 'taxAmount',
      key: 'taxAmount',
      render: (taxAmount) => `¥${taxAmount}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '开票日期',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      render: (date) => date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button 
            type="default" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          >
            修改
          </Button>
          <Button 
            danger
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>发票管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增发票
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={invoices} 
        rowKey="id" 
        loading={loading}
      />

      <Modal
        title={isViewMode ? '查看发票详情' : (currentInvoice ? '修改发票' : '新增发票')}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={isViewMode ? [
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            提交
          </Button>,
        ]}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={isViewMode}
        >
          <Form.Item
            name="invoiceType"
            label="发票类型"
            rules={[{ required: true, message: '请选择发票类型' }]}
          >
            <Select placeholder="请选择发票类型">
              <Option value="增值税专用发票">增值税专用发票</Option>
              <Option value="增值税普通发票">增值税普通发票</Option>
              <Option value="电子发票">电子发票</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="customerName"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input placeholder="请输入客户名称" />
          </Form.Item>

          <Form.Item
            name="customerTaxNo"
            label="客户税号"
            rules={[{ required: true, message: '请输入客户税号' }]}
          >
            <Input placeholder="请输入客户税号" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="金额"
            rules={[{ required: true, message: '请输入金额' }]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              placeholder="请输入金额" 
              precision={2}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="taxAmount"
            label="税额"
            rules={[{ required: true, message: '请输入税额' }]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              placeholder="请输入税额" 
              precision={2}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="待开具">待开具</Option>
              <Option value="已开具">已开具</Option>
              <Option value="已作废">已作废</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="relatedPaymentNo"
            label="关联收款编号"
          >
            <Input placeholder="请输入关联收款编号" />
          </Form.Item>

          <Form.Item
            name="title"
            label="发票抬头"
          >
            <Input placeholder="请输入发票抬头" />
          </Form.Item>

          <Form.Item
            name="content"
            label="发票内容"
          >
            <Input.TextArea rows={2} placeholder="请输入发票内容" />
          </Form.Item>

          <Form.Item
            name="invoiceDate"
            label="开票日期"
            rules={[{ required: true, message: '请选择开票日期' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} placeholder="请选择开票日期" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InvoiceList;
