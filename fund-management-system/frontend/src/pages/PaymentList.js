import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, DatePicker, Space, message } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { paymentApi } from '../services/api';
import dayjs from 'dayjs';

const { Option } = Select;

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await paymentApi.getAll();
      setPayments(response.data);
    } catch (error) {
      message.error('获取收款列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (record) => {
    setCurrentPayment(record);
    setIsViewMode(true);
    form.setFieldsValue({
      ...record,
      paymentTime: record.paymentTime ? dayjs(record.paymentTime) : null,
    });
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentPayment(record);
    setIsViewMode(false);
    form.setFieldsValue({
      ...record,
      paymentTime: record.paymentTime ? dayjs(record.paymentTime) : null,
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentPayment(null);
    setIsViewMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条收款记录吗？',
      onOk: async () => {
        try {
          await paymentApi.delete(id);
          message.success('删除成功');
          fetchPayments();
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
        paymentTime: values.paymentTime ? values.paymentTime.format('YYYY-MM-DDTHH:mm:ss') : null,
      };

      if (currentPayment) {
        await paymentApi.update(currentPayment.id, submitData);
        message.success('更新成功');
      } else {
        await paymentApi.create(submitData);
        message.success('创建成功');
      }
      setIsModalVisible(false);
      fetchPayments();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns = [
    {
      title: '收款编号',
      dataIndex: 'paymentNo',
      key: 'paymentNo',
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
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '收款时间',
      dataIndex: 'paymentTime',
      key: 'paymentTime',
      render: (time) => time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '-',
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
            type="danger" 
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
        <h2>收款管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增收款
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={payments} 
        rowKey="id" 
        loading={loading}
      />

      <Modal
        title={isViewMode ? '查看收款详情' : (currentPayment ? '修改收款' : '新增收款')}
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
            name="customerName"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input placeholder="请输入客户名称" />
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
            name="paymentMethod"
            label="支付方式"
            rules={[{ required: true, message: '请选择支付方式' }]}
          >
            <Select placeholder="请选择支付方式">
              <Option value="银行转账">银行转账</Option>
              <Option value="支付宝">支付宝</Option>
              <Option value="微信支付">微信支付</Option>
              <Option value="现金">现金</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="待处理">待处理</Option>
              <Option value="处理中">处理中</Option>
              <Option value="已完成">已完成</Option>
              <Option value="已取消">已取消</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="bankAccount"
            label="银行账户"
          >
            <Input placeholder="请输入银行账户" />
          </Form.Item>

          <Form.Item
            name="transactionNo"
            label="交易流水号"
          >
            <Input placeholder="请输入交易流水号" />
          </Form.Item>

          <Form.Item
            name="paymentTime"
            label="收款时间"
            rules={[{ required: true, message: '请选择收款时间' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} placeholder="请选择收款时间" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea rows={3} placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentList;
