import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, DatePicker, Space, message } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { refundApi } from '../services/api';
import dayjs from 'dayjs';

const { Option } = Select;

const RefundList = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentRefund, setCurrentRefund] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    setLoading(true);
    try {
      const response = await refundApi.getAll();
      setRefunds(response.data);
    } catch (error) {
      message.error('获取退款列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (record) => {
    setCurrentRefund(record);
    setIsViewMode(true);
    form.setFieldsValue({
      ...record,
      refundTime: record.refundTime ? dayjs(record.refundTime) : null,
    });
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentRefund(record);
    setIsViewMode(false);
    form.setFieldsValue({
      ...record,
      refundTime: record.refundTime ? dayjs(record.refundTime) : null,
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentRefund(null);
    setIsViewMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条退款记录吗？',
      onOk: async () => {
        try {
          await refundApi.delete(id);
          message.success('删除成功');
          fetchRefunds();
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
        refundTime: values.refundTime ? values.refundTime.format('YYYY-MM-DDTHH:mm:ss') : null,
      };

      if (currentRefund) {
        await refundApi.update(currentRefund.id, submitData);
        message.success('更新成功');
      } else {
        await refundApi.create(submitData);
        message.success('创建成功');
      }
      setIsModalVisible(false);
      fetchRefunds();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns = [
    {
      title: '退款编号',
      dataIndex: 'refundNo',
      key: 'refundNo',
    },
    {
      title: '原收款编号',
      dataIndex: 'originalPaymentNo',
      key: 'originalPaymentNo',
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
      title: '退款方式',
      dataIndex: 'refundMethod',
      key: 'refundMethod',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '退款时间',
      dataIndex: 'refundTime',
      key: 'refundTime',
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
        <h2>退款管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增退款
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={refunds} 
        rowKey="id" 
        loading={loading}
      />

      <Modal
        title={isViewMode ? '查看退款详情' : (currentRefund ? '修改退款' : '新增退款')}
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
            name="originalPaymentNo"
            label="原收款编号"
            rules={[{ required: true, message: '请输入原收款编号' }]}
          >
            <Input placeholder="请输入原收款编号" />
          </Form.Item>

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
            name="refundMethod"
            label="退款方式"
            rules={[{ required: true, message: '请选择退款方式' }]}
          >
            <Select placeholder="请选择退款方式">
              <Option value="原路退回">原路退回</Option>
              <Option value="银行转账">银行转账</Option>
              <Option value="支付宝">支付宝</Option>
              <Option value="微信支付">微信支付</Option>
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
              <Option value="已拒绝">已拒绝</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="reason"
            label="退款原因"
          >
            <Input.TextArea rows={2} placeholder="请输入退款原因" />
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
            name="refundTime"
            label="退款时间"
            rules={[{ required: true, message: '请选择退款时间' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} placeholder="请选择退款时间" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RefundList;
